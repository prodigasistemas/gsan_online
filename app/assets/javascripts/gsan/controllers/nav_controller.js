var app = angular.module("gsan");

app.controller("NavController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
  $scope.states = {};

  $scope.items = [
    { modulo: "Cadastro", grupo: "Endereços", id: 'ceps',                     title: 'CEPs' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'municipios',               title: 'Municípios' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'bairros',                  title: 'Bairros' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'logradouros',              title: 'Logradouros' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'micro_regioes',            title: 'Micro Regiões' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'regioes',                  title: 'Regiões' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'regioes_desenvolvimento',  title: 'Regiões de Desenvolvimento' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'clientes',                 title: 'Clientes' }
  ];

  $scope.grupos = [
    { id: 'cadastro/painel',                   title: "Todos" },
    { id: 'cadastro/painel?filtro=enderecos',  title: "Endereços" },
    { id: 'cadastro/painel?filtro=clientes',   title: "Clientes" }
  ];

  $rootScope.$on("$routeChangeSuccess", function() {
    $scope.changeTab();
  });

  $scope.changeTab = function() {
    $scope.currentPage = $location.url();
    $scope.states.activeItem = $location.url().substring(1, $location.url().length);
  };

  $scope.navigarPara = function(pagina) {
    $scope.item = {};
    $location.url(pagina);
  };

  $scope.changeTab();
}]);
