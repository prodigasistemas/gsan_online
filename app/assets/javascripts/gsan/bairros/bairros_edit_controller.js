var app = angular.module("gsan");

app.controller("BairrosEditController", ["Bairro", "Municipio", "DistritoOperacional", "CadastroUrl", "$scope", "$http", "$location", "$filter", "Flash", "$route", function(Bairro, Municipio, DistritoOperacional, CadastroUrl, $scope, $http, $location, $filter, Flash, $route) {
  $scope.bairro = Bairro.get({id: $route.current.params.id});
  $scope.bairro_area = {};

  $scope.municipios = Municipio.query();
  $scope.distrito_operacionais = DistritoOperacional.query();

  $scope.adicionaArea = function() {
    if (areaSelecionada()) { return; }

    if ($scope.bairro_area.distrito_operacional)
      $scope.bairro_area.distrito_operacional_id = $scope.bairro_area.distrito_operacional.id;
    
    $scope.bairro.bairro_areas.push($scope.bairro_area);

    $scope.bairro_area = {};
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
