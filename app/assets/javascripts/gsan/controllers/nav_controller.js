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
    { modulo: "Cadastro", grupo: "Endereços", id: 'cep_tipos',                title: 'Tipos de CEP' },
    { modulo: "Cadastro", grupo: "Endereços", id: 'regioes_desenvolvimento',  title: 'Regiões de Desenvolvimento' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'clientes',                 title: 'Clientes' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'cliente_tipos',            title: 'Tipos de Clientes' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'esferas_poder',            title: 'Esferas de Poder' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'profissoes',               title: 'Profissões' },
    { modulo: "Cadastro", grupo: "Clientes",  id: 'ramos_atividade',          title: 'Ramos de Atividade' }


  ];

  $scope.grupos = [
    { id: 'cadastro/painel',                   title: "Painel de Cadastro" },
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
