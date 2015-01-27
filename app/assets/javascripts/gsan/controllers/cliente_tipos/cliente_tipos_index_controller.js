var app = angular.module("gsan");

app.controller("ClienteTiposIndexController", ["EsferaPoder", "ClienteTipo", "$scope", function(EsferaPoder, ClienteTipo, $scope) {
  $scope.query = {};

  $scope.esferasPoder    = EsferaPoder.query();
  $scope.pessoaTipos     = [{descricao: "PESSOA FISICA", id: 1}, {descricao: "PESSOA JURIDICA", id: 2}];

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
    $scope.loading = true;
    ClienteTipo.search($scope.queryCache, function(data) {
      $scope.clienteTipos = data.cliente_tipos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
