var app = angular.module("gsan");

app.controller("RegioesDesenvolvimentoIndexController", ["RegiaoDesenvolvimento", "Flash", "$scope", "$http", "CadastroUrl", function(RegiaoDesenvolvimento, Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

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

    $http.get(
      CadastroUrl() + "/regioes_desenvolvimento?" + query
    )
    .success(function(data) {
      $scope.regioesDesenvolvimento = data.regioes_desenvolvimento;
      $scope.page = data.page;
      $scope.loading = false;
    })
    .error(function() {
      $scope.loading = false;
    });
  }

}]);
