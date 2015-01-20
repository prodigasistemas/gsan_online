var app = angular.module("gsan");

app.controller("ClientesIndexController", ["Flash", "$scope", "$http", "CadastroUrl", "breadcrumbs", function(Flash, $scope, $http, CadastroUrl, breadcrumbs) {
  $scope.flash = Flash;
  $scope.query = {};
  $scope.breadcrumbs = breadcrumbs;

  $scope.queryVazia = function() {
    for(var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  }

  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({}, $scope.query);
    $scope.queryCache = { query: copiedQuery };
    $scope.submeterPesquisa();
  }

  $scope.submeterPesquisa = function() {
    var query = $.param($scope.queryCache);
    $scope.loading = true;
    $http.get(CadastroUrl() + "/clientes?" + query)
    .success(function(data) {
      $scope.clientes = data.clientes;
      $scope.page = data.page;
      $scope.loading = false;
    }).error(function() {
      $scope.loading = false;
    });
  }
}]);
