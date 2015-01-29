var app = angular.module("gsan");

app.controller("OrgaosExpedidoresRgIndexController", ["OrgaoExpedidorRg", "$scope", function(OrgaoExpedidorRg, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    OrgaoExpedidorRg.search(query, function(data) {
      $scope.orgaosExpedidoresRg = data.orgaos_expedidores_rg;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
