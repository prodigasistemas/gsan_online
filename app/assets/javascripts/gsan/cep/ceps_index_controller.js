var app = angular.module("gsan");

app.controller("CepsIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;

  $scope.query = { cep_cdcep: "68508060" };

  $scope.pesquisar = function() {
    var query = $.param({ query: $scope.query });
    $http.get(CadastroUrl() + "/ceps?" + query).success(function(data) {
      $scope.ceps = data;
    });
  }
}]);
