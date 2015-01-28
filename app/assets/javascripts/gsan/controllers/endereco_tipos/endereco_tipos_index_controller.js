var app = angular.module("gsan");

app.controller("EnderecoTiposIndexController", ["EnderecoTipo", "$scope", function(EnderecoTipo, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    EnderecoTipo.search(query, function(data) {
      $scope.enderecoTipos = data.endereco_tipos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
