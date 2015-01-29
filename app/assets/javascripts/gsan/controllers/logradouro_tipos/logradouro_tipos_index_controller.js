var app = angular.module("gsan");

app.controller("LogradouroTiposIndexController", ["LogradouroTipo", "$scope", function(LogradouroTipo, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    LogradouroTipo.search(query, function(data) {
      $scope.logradouroTipos = data.logradouro_tipos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
