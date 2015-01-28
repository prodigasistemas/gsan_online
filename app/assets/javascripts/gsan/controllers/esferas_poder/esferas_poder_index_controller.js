var app = angular.module("gsan");

app.controller("EsferasPoderIndexController", ["EsferaPoder", "$scope", function(EsferaPoder, $scope) {
  $scope.filterOptions = {}

  $scope.submeterPesquisa = function(query) {
    $scope.loading = true;
    EsferaPoder.search(query, function(data) {
      $scope.esferasPoder = data.esferas_poder;
      $scope.page = data.page;
      $scope.loading = false;
    }, function() {
      $scope.loading = false;
    });
  }
}]);
