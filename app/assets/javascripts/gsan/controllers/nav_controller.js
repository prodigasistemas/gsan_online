var app = angular.module("gsan");

app.controller("NavController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
  $rootScope.$on("$routeChangeSuccess", function() {
    $scope.changeTab();
  });

  $scope.changeTab = function() {
    $scope.currentPage = $location.url();
    $scope.ceps = $location.url().match(/ceps/) ? true : false;
    $scope.municipios = $location.url().match(/municipios/) ? true : false;
  }

  $scope.changeTab();
}]);
