var app = angular.module("gsan");

app.controller("CepTiposIndexController", ["CepTipo", "$scope", function(CepTipo, $scope) {

  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    CepTipo.search(query, function(data) {
      $scope.cepTipos = data.cep_tipos;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
