app = angular.module("gsan", ['ngRoute','templates']);

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

app.controller("CepsIndexController", function($scope, $http) {
  $http.get("http://localhost:3001/ceps").success(function(data) {
    $scope.ceps = data;
  });
})

app.controller("CepsNewController", function($scope, $http, $location) {
  $scope.createCep = function() {
    $http.post("http://localhost:3001/ceps", { cep: $scope.cep }).success(function(data) {
      $location.url("/")
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
})
