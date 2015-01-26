var app = angular.module("gsan");

app.controller("NavController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
  $scope.states = {};

  $scope.items = [
    { id: 'ceps',                     title: 'CEPs' },
    { id: 'municipios',               title: 'Municípios' },
    { id: 'bairros',                  title: 'Bairros' },
    { id: 'logradouros',              title: 'Logradouros' },
    { id: 'micro_regioes',            title: 'Micro Regiões' },
    { id: 'regioes',                  title: 'Regiões' },
    { id: 'regioes_desenvolvimento',  title: 'Regiões de Desenvolvimento' },
    { id: 'clientes',                 title: 'Clientes' }
  ];

  $scope.grupos = [
    { id: 'painel',                   title: "Todos" },
    { id: 'painel?filtro=enderecos',  title: "Endereços" },
    { id: 'painel?filtro=clientes',   title: "Clientes" }
  ]

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
