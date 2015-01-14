var app = angular.module("gsan");

app.controller("CepsIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $http.get(CadastroUrl() + "/cep_tipos").success(function(data) {
    $scope.cepTipos = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data;
  });

  $http.get(CadastroUrl() + "/unidade_federacoes").success(function(data) {
    $scope.unidade_federacoes = data;
  });

  $http.get(CadastroUrl() + "/tipo_logradouros").success(function(data) {
    $scope.tipo_logradouros = data;
  });

  $scope.pesquisar = function() {
    var query = $.param({ query: $scope.query });
    $http.get(CadastroUrl() + "/ceps?" + query).success(function(data) {
      $scope.ceps = data;
    });
  }
}]);
