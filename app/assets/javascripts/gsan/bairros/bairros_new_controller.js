var app = angular.module("gsan");

app.controller("BairrosNewController", ["Bairro", "Municipio", "DistritoOperacional", "CadastroUrl", "$scope", "$http", "$location", "Flash", function(Bairro, Municipio, DistritoOperacional, CadastroUrl, $scope, $http, $location, Flash) {
  $scope.bairro = {ativo: 1};
  //$scope.bairro_area = {};
  //$scope.distrito_operacional = {};
  //$scope.bairro.areas = [];

  $scope.municipios = Municipio.query();
  $scope.distrito_operacionais = DistritoOperacional.query();

  $scope.atualizaMunicipioId = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;
  };
/*
  $scope.adicionaArea = function() {
    if (areaSelecionada()) { return; }
    $scope.bairro.bairro_areas.push({nome: $scope.bairro_area.nome, distrito_operacional: $scope.distrito_operacional.selecionado});
  };

  $scope.removeArea = function(bairroArea) {
    var index = $scope.bairro.bairro_areas.indexOf(bairroArea);
    $scope.bairro.bairro_areas.splice(index, 1);
  };
*/
  $scope.submeter = function() {
    var bairro = new Bairro({bairro: $scope.bairro});
    bairro.$save(function() {
      Flash.setMessage("Bairro criado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
