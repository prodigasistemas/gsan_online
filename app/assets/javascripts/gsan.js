var app = angular.module("gsan", ['ngRoute', 'ngResource','templates', 'ui.select', 'ngSanitize', 'ng-breadcrumbs']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/ceps', {
        templateUrl: 'ceps/index.html',
        controller: 'CepsIndexController',
        label: 'CEPs'
      }).
      when('/ceps/novo', {
        templateUrl: 'ceps/new.html',
        controller: 'CepsNewController',
        label: 'Novo'
      }).
      when('/ceps/:id/editar', {
        templateUrl: 'ceps/edit.html',
        controller: 'CepsEditController',
        label: 'Editar'
      }).
      when('/municipios', {
        templateUrl: 'municipios/index.html',
        controller: 'MunicipiosIndexController',
        label: 'Municípios'
      }).
      when('/municipios/novo', {
        templateUrl: 'municipios/new.html',
        controller: 'MunicipiosNewController',
        label: 'Novo'
      }).
      when('/municipios/:id/editar', {
        templateUrl: 'municipios/edit.html',
        controller: 'MunicipiosEditController',
        label: 'Editar'
      }).
      when('/bairros', {
        templateUrl: 'bairros/index.html',
        controller: 'BairrosIndexController',
        label: 'Bairros'
      }).
      when('/bairros/novo', {
        templateUrl: 'bairros/new.html',
        controller: 'BairrosNewController',
        label: 'Novo'
      }).
      when('/bairros/:id/editar', {
        templateUrl: 'bairros/edit.html',
        controller: 'BairrosEditController',
        label: 'Editar'
      }).
      when('/logradouros', {
        templateUrl: 'logradouros/index.html',
        controller: 'LogradourosIndexController',
        label: 'Logradouro'
      }).
      when('/logradouros/novo', {
        templateUrl: 'logradouros/new.html',
        controller: 'LogradourosNewController',
        label: 'Novo'
      }).
      when('/logradouros/:id/editar', {
        templateUrl: 'logradouros/edit.html',
        controller: 'LogradourosEditController',
        label: 'Editar'
      }).
      otherwise({
        redirectTo: '/ceps'
      });

    $locationProvider.html5Mode(true);
  }]);

app.constant("CadastroUrl", function() { return $("body").data("cadastro-url") });
