var app = angular.module("gsan");

app.controller("ProfissoesIndexController", ["Profissao", "$scope", function(Profissao, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    Profissao.search(query, function(data) {
      $scope.profissoes = data.profissoes;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
