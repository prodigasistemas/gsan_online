var app = angular.module("gsan");

app.controller("ClientesIndexController", ["$scope", "Cliente", "ClienteTipo", function($scope, Cliente, ClienteTipo) {
  $scope.filterOptions = {}
  $scope.filterOptions.clienteTipos = ClienteTipo.query();

  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;

    Cliente.search(query, function(data) {
      $scope.clientes = data.clientes;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
