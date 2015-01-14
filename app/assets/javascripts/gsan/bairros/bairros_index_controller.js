var app = angular.module("gsan");

app.controller("BairrosIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $scope.queryVazia = function() {
    for(var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  }

  $scope.pagina = function(soma) {
    if ($scope.page.current_page + soma < $scope.page.total_pages ||
      $scope.page.current_page + soma < 1) {
      return
    }
    $scope.queryCache.page = $scope.page.current_page + soma;

    submeterPesquisa();
  }

  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({}, $scope.query);
    $scope.queryCache = { query: copiedQuery };
    submeterPesquisa();
  }

  var submeterPesquisa = function() {
    var query = $.param($scope.queryCache);
    $scope.loading = true;
    $http.get(CadastroUrl() + "/bairros?" + query)
    .success(function(data) {
      $scope.bairros = data.bairros;
      $scope.page = data.page;
      $scope.loading = false;
    }).error(function() {
      $scope.loading = false;
    });
  }
}]);