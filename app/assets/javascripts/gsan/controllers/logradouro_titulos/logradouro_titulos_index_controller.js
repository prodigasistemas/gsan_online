var app = angular.module("gsan");

app.controller("LogradouroTitulosIndexController", ["LogradouroTitulo", "$scope", function(LogradouroTitulo, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    LogradouroTitulo.search(query, function(data) {
      $scope.logradouroTitulos = data.logradouro_titulos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
