var app = angular.module("gsan");

app.controller("ClienteTiposIndexController", ["EsferaPoder", "ClienteTipo", "$scope", function(EsferaPoder, ClienteTipo, $scope) {
  $scope.filterOptions = {}
  $scope.filterOptions.esferasPoder = EsferaPoder.query();
  $scope.filterOptions.pessoaTipos  = [{descricao: "PESSOA FISICA", id: 1}, {descricao: "PESSOA JURIDICA", id: 2}];

  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    ClienteTipo.search(query, function(data) {
      $scope.clienteTipos = data.cliente_tipos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
