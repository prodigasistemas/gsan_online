var app = angular.module("gsan");

app.controller("BairrosEditController", ["Bairro", "Municipio", "DistritoOperacional", "CadastroUrl", "$scope", "$http", "$location", "$filter", "Flash", "$route", function(Bairro, Municipio, DistritoOperacional, CadastroUrl, $scope, $http, $location, $filter, Flash, $route) {
  $scope.bairro = Bairro.get({id: $route.current.params.id}, function(data) {
    $scope.atualizaAreas();
  });
  $scope.bairro_area = {};
  $scope.distrito_operacional = {};

  $scope.municipios = Municipio.query();
  $scope.distrito_operacionais = DistritoOperacional.query();

  $scope.atualizaAreas = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;

    var query = $.param({ query: { bairro_id: $scope.bairro.id } });
    $http.get(CadastroUrl() + "/bairro_areas?" + query).success(function(data) {
      $scope.bairro.bairro_areas = data.bairro_areas;
      $scope.bairro_area = {}
    });
  };

  $scope.adicionaArea = function() {
    if (areaSelecionada()) { return; }

    $scope.bairro.bairro_areas.push({
      nome: $scope.bairro_area.nome,
      distrito_operacional_id: $scope.distrito_operacional.selecionado.id,
      distrito_operacional_descricao: $scope.distrito_operacional.selecionado.descricao
    });

    $scope.bairro_area = {};
    $scope.distrito_operacional = {};
    angular.element('#bairro_area_nome').focus();
  };

  var areaSelecionada = function() {
    $scope.bairro = $scope.bairro || [];
    $scope.bairro.bairro_areas = $scope.bairro.bairro_areas || [];

    var areas = $scope.bairro.bairro_areas.map(function(bairroArea) { return bairroArea.nome; });
    var areaDuplicada = $scope.bairro.bairro_areas.length && $filter('filter')(areas, $scope.bairro_area.nome).length;

    if (areaDuplicada) {
      $scope.bairro_area.resultado = "Área já adicionada";
      return true;
    }
  };

  $scope.removeArea = function(bairroArea) {
    if (bairroArea.id) {
      bairroArea._destroy = 1;
    } else {
      var index = $scope.bairro.bairro_areas.indexOf(bairroArea);
      $scope.bairro.bairro_areas.splice(index, 1);
    }
  };

  var construirParametrosParaBairroAreas = function() {
    $scope.bairro.bairro_areas_attributes = {};

    $.each($scope.bairro.bairro_areas, function(index, bairro_area) {
      $scope.bairro.bairro_areas_attributes[index] = bairro_area
      if (bairro_area._destroy) {
        $scope.bairro.bairro_areas_attributes[index]._destroy = 1;
      }
    });
  };

  $scope.submeter = function() {
    construirParametrosParaBairroAreas();

    var bairro = new Bairro({id: $scope.bairro.id, bairro: $scope.bairro});
    bairro.$update(function() {
      Flash.setMessage("Bairro editado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
