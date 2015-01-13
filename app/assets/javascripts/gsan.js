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
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  }]);

app.constant("CadastroUrl", function() { return $("body").data("cadastro-url") });
