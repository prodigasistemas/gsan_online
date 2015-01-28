var app = angular.module("gsan");

app.controller("RamosAtividadeIndexController", ["RamoAtividade", "$scope", function(RamoAtividade, $scope) {
  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    RamoAtividade.search(query, function(data) {
      $scope.ramosAtividade = data.ramos_atividade;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
