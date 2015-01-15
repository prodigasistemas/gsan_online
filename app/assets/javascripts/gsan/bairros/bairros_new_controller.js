var app = angular.module("gsan");

app.controller("BairrosNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", function(CadastroUrl, $scope, $http, $location, Flash) {
  $scope.bairro = {ativo: 2};

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $scope.submeter = function() {
    $http.post(CadastroUrl() + "/bairros", { bairro: $scope.bairro })
    .success(function(data) {
      Flash.setMessage("Bairro criado com sucesso");
      $location.url("/bairros");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);