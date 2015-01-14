var app = angular.module("gsan");

app.controller("BairrosEditController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(CadastroUrl, $scope, $http, $location, Flash, $route) {
  $http.get(CadastroUrl() + "/bairros/" + $route.current.params.id).success(function(data) {
    $scope.bairro = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $scope.submeter = function() {
    $http.put(CadastroUrl() + "/bairros/" + $scope.bairro.id, { bairro: $scope.bairro })
    .success(function(data) {
      Flash.setMessage("Bairro editado com sucesso");
      $location.url("/bairros");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
