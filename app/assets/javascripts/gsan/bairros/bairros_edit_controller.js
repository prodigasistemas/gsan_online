var app = angular.module("gsan");

app.controller("BairrosEditController", ["Bairro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(Bairro, Municipio, CadastroUrl, $scope, $http, $location, Flash, $route) {
  $scope.bairro = Bairro.get({id: $route.current.params.id});
  $scope.municipios = Municipio.query();

  $scope.submeter = function() {
    var bairro = new Bairro({bairro: $scope.bairro});
    bairro.$save(function() {
      Flash.setMessage("Bairro editado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
