var app = angular.module("gsan", ['ngRoute', 'ngResource','templates', 'ui.select', 'ngSanitize', 'ng-breadcrumbs']);

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
      when('/bairros', {
        templateUrl: 'bairros/index.html',
        controller: 'BairrosIndexController'
      }).
      when('/bairros/novo', {
        templateUrl: 'bairros/new.html',
        controller: 'BairrosNewController'
      }).
      when('/bairros/:id/editar', {
        templateUrl: 'bairros/edit.html',
        controller: 'BairrosEditController'
      }).
      when('/logradouros', {
        templateUrl: 'logradouros/index.html',
        controller: 'LogradourosIndexController'
      }).
      when('/logradouros/novo', {
        templateUrl: 'logradouros/new.html',
        controller: 'LogradourosNewController'
      }).
      when('/logradouros/:id/editar', {
        templateUrl: 'logradouros/edit.html',
        controller: 'LogradourosEditController'
      }).
      when('/distrito_operacionais', {
        templateUrl: 'distrito_operacionais/index.html',
        controller: 'DistritoOperacionaisIndexController'
      }).
      when('/micro_regioes', {
        templateUrl: 'micro_regioes/index.html',
        controller: 'MicroRegioesIndexController'
      }).
      when('/micro_regioes/novo', {
        templateUrl: 'micro_regioes/new.html',
        controller: 'MicroRegioesNewController'
      }).
      when('/micro_regioes/:id/editar', {
        templateUrl: 'micro_regioes/edit.html',
        controller: 'MicroRegioesEditController'
      }).
      when('/regioes', {
        templateUrl: 'regioes/index.html',
        controller: 'RegioesIndexController'
      }).
      when('/regioes/novo', {
        templateUrl: 'regioes/new.html',
        controller: 'RegioesNewController'
      }).
      when('/regioes/:id/editar', {
        templateUrl: 'regioes/edit.html',
        controller: 'RegioesEditController'
      }).
      when('/regioes_desenvolvimento', {
        templateUrl: 'regioes_desenvolvimento/index.html',
        controller: 'RegioesDesenvolvimentoIndexController'
      }).
      when('/regioes_desenvolvimento/novo', {
        templateUrl: 'regioes_desenvolvimento/new.html',
        controller: 'RegioesDesenvolvimentoNewController'
      }).
      when('/regioes_desenvolvimento/:id/editar', {
        templateUrl: 'regioes_desenvolvimento/edit.html',
        controller: 'RegioesDesenvolvimentoEditController'
      }).
      otherwise({
        redirectTo: '/ceps'
      });

    $locationProvider.html5Mode(true);
  }]);

app.constant("CadastroUrl", function() { return $("body").data("cadastro-url") });
