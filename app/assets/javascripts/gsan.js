var app = angular.module("gsan", ['ngRoute','templates']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/ceps', {
        templateUrl: 'ceps/index.html',
        controller: 'CepsIndexController'
      }).
      when('/ceps/novo', {
        templateUrl: 'ceps/new.html',
        controller: 'CepsNewController'
      }).
      when('/ceps/:id/editar', {
        templateUrl: 'ceps/edit.html',
        controller: 'CepsEditController'
      }).
      when('/municipios', {
        templateUrl: 'municipios/index.html',
        controller: 'MunicipiosIndexController'
      }).
      when('/municipios/novo', {
        templateUrl: 'municipios/new.html',
        controller: 'MunicipiosNewController'
      }).
      when('/municipios/:id/editar', {
        templateUrl: 'municipios/edit.html',
        controller: 'MunicipiosEditController'
      }).
      otherwise({
        redirectTo: '/ceps'
      });

    $locationProvider.html5Mode(true);
  }]);

app.constant("CadastroUrl", function() { return $("body").data("cadastro-url") });
