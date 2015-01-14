var app = angular.module("gsan");

app.controller("MunicipiosIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $http.get(CadastroUrl() + "/unidade_federacoes").success(function(data) {
    $scope.unidade_federacoes = data;
  });

  $http.get(CadastroUrl() + "/micro_regioes").success(function(data) {
    $scope.micro_regioes = data;
  });

  $http.get(CadastroUrl() + "/regioes_desenvolvimento").success(function(data) {
    $scope.regioes_desenvolvimento = data;
  });

  $scope.pesquisar = function() {
    var query = $.param({ query: $scope.query });
    $http.get(CadastroUrl() + "/municipios?" + query).success(function(data) {
      $scope.municipios = data;
    });
  }
}]);
