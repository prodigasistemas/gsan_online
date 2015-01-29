var app = angular.module("gsan");

app.controller("UnidadeFederacoesIndexController", ["UnidadeFederacao", "$scope", function(UnidadeFederacao, $scope) {

  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    UnidadeFederacao.search(query, function(data) {
      $scope.unidadeFederacoes = data.unidade_federacoes;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
