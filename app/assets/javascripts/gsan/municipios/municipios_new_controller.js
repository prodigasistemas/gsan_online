var app = angular.module("gsan");

app.controller("MunicipiosNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", function(CadastroUrl, $scope, $http, $location, Flash) {
  $scope.municipio = {ativo: 2};

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
    $http.post(CadastroUrl() + "/municipios", { municipio: $scope.municipio })
    .success(function(data) {
      Flash.setMessage("Município criado com sucesso");
      $location.url("/municipios");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
