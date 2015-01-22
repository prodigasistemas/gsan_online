var app = angular.module("gsan");

app.controller("NavController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
  $scope.states = {};
  $scope.states.activeItem = 'ceps';
  $scope.items = [
    { id: 'ceps',         title: 'CEPs' },
    { id: 'municipios',   title: 'Municípios' },
    { id: 'bairros',      title: 'Bairros' },
    { id: 'logradouros',  title: 'Logradouros' }
  ];

  $rootScope.$on("$routeChangeSuccess", function() {
    $scope.changeTab();
  });

  $scope.changeTab = function() {
    $scope.currentPage = $location.url();
    $scope.states.activeItem = $location.url().substring(1, $location.url().length);
    $scope.ceps = $location.url().match(/ceps/) ? true : false;
    $scope.municipios = $location.url().match(/municipios/) ? true : false;
  }

  $scope.changeTab();
}]);
