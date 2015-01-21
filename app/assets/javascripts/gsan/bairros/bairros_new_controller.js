var app = angular.module("gsan");

app.controller("BairrosNewController", ["Bairro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "Flash", function(Bairro, Municipio, CadastroUrl, $scope, $http, $location, Flash) {
  $scope.bairro = {ativo: 1};
  $scope.municipios = Municipio.query();

  $scope.atualizaMunicipioId = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;
  };

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
