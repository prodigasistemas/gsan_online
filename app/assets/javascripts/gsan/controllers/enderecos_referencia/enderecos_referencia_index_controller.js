var app = angular.module("gsan");

app.controller("EnderecosReferenciaIndexController", ["EnderecoReferencia", "$scope", function(EnderecoReferencia, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    EnderecoReferencia.search(query, function(data) {
      $scope.enderecosReferencia = data.enderecos_referencia;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
