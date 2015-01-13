var app = angular.module("gsan");

app.controller("MunicipiosEditController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(CadastroUrl, $scope, $http, $location, Flash, $route) {
  $http.get(CadastroUrl() + "/municipios/" + $route.current.params.id).success(function(data) {
    $scope.municipio = data;
  });

  $http.get(CadastroUrl() + "/micro_regioes").success(function(data) {
    $scope.micro_regioes = data;
  });

  $http.get(CadastroUrl() + "/regioes_desenvolvimento").success(function(data) {
    $scope.regioes_desenvolvimento = data;
  });

  $http.get(CadastroUrl() + "/unidade_federacoes").success(function(data) {
    $scope.unidade_federacoes = data;
  });

  $scope.submeter = function() {
    $http.put(CadastroUrl() + "/municipios/" + $scope.municipio.id, { municipio: $scope.municipio })
    .success(function(data) {
      Flash.setMessage("Município editado com sucesso");
      $location.url("/municipios");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
