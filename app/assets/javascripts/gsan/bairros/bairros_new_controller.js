var app = angular.module("gsan");

app.controller("BairrosNewController", ["Bairro", "Municipio", "DistritoOperacional", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter", function(Bairro, Municipio, DistritoOperacional, CadastroUrl, $scope, $http, $location, Flash, $filter) {
  $scope.bairro = {ativo: 1};
  $scope.bairro_area = {};
  $scope.distrito_operacional = {};

  $scope.municipios = Municipio.query();
  $scope.distrito_operacionais = DistritoOperacional.query();

  $scope.atualizaMunicipioId = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;
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
    var index = $scope.bairro.bairro_areas.indexOf(bairroArea);
    $scope.bairro.bairro_areas.splice(index, 1);
  };

  var construirParametrosParaBairroAreas = function() {
    if (!$scope.bairro.bairro_areas) { return; }
    $scope.bairro.bairro_areas_attributes = {};

    $.each($scope.bairro.bairro_areas, function(index, bairro_area) {
      $scope.bairro.bairro_areas_attributes[index] = bairro_area
    });
  };

  $scope.submeter = function() {
    construirParametrosParaBairroAreas();

    var bairro = new Bairro({bairro: $scope.bairro});
    bairro.$save(function() {
      Flash.setMessage("Bairro criado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
