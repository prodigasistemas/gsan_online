var app = angular.module("gsan", ['ngRoute','templates']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'ceps/index.html',
        controller: 'CepsIndexController'
      }).
      when('/ceps/novo', {
        templateUrl: 'ceps/new.html',
        controller: 'CepsNewController'
      }).
      otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }]);

app.controller("CepsIndexController", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $http.get(CadastroUrl() + "/ceps").success(function(data) {
    $scope.ceps = data;
  });
})

app.constant("CadastroUrl", function() { return $("body").data("cadastro-url") });
