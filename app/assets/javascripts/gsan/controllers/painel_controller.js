var app = angular.module("gsan");

app.controller("PainelController", ["$route", "$scope", "$location", function($route, $scope, $location) {
  $scope.filtro = $route.current.params.filtro || '';

  $scope.modulos = [
    { url: '/cadastro/painel', icone: "plus", titulo: "Cadastro" },
    { url: '',                 icone: "money", titulo: "Financeiro" },
    { url: '',                 icone: "dollar", titulo: "Cobrança" },
    { url: '',                 icone: "cc-visa", titulo: "Micro Medição" },
    { url: '',                 icone: "leanpub", titulo: "Faturamento" }
  ];

  $scope.grupos = [{
      titulo: "Endereços",
      items: [
        { grupo: "enderecos", icone: 'fa fa-envelope', url: '/ceps',                     titulo: 'CEPs' },
        { grupo: "enderecos", icone: 'fa fa fa-building', url: '/municipios',               titulo: 'Municípios' },
        { grupo: "enderecos", icone: 'fa fa-location-arrow', url: '/bairros',                  titulo: 'Bairros' },
        { grupo: "enderecos", icone: 'fa fa-map-marker', url: '/logradouros',              titulo: 'Logradouros' },
        { grupo: "enderecos", icone: 'fa fa-tree', url: '/micro_regioes',            titulo: 'Micro Regiões' },
        { grupo: "enderecos", icone: 'fa fa-sun-o', url: '/regioes',                  titulo: 'Regiões' },
        { grupo: "enderecos", icone: 'fa fa-sun-o', url: '/regioes_desenvolvimento',  titulo: 'Regiões de Desenvolvimento' },
        { grupo: "enderecos", icone: 'fa fa-university', url: '',                          titulo: 'Unidade de Federação' },
        { grupo: "enderecos", icone: 'fa fa-envelope-square', url: '',                          titulo: 'Tipos de CEP' },
        { grupo: "enderecos", icone: 'fa fa-cube', url: '',                          titulo: 'Títulos de Logradouros' },
        { grupo: "enderecos", icone: 'fa fa-asterisk', url: '',                          titulo: 'Tipos de logradouros' }
      ]
    },{
      titulo: "Clientes",
      items: [
        { grupo: "clientes", icone: 'fa fa-users', url: '/clientes',                 titulo: 'Clientes' },
        { grupo: "clientes", icone: 'fa fa-map-marker', url: '',                          titulo: 'Tipos de clientes' },
        { grupo: "clientes", icone: 'fa fa-circle', url: '',                          titulo: 'Esferas de poder' },
        { grupo: "clientes", icone: 'fa fa-street-view', url: '',                          titulo: 'Endereço de Referência' },
        { grupo: "clientes", icone: 'fa fa-circle', url: '',                          titulo: 'Ramos de Atividades' },
        { grupo: "clientes", icone: 'fa fa-university', url: '',                          titulo: 'Órgão Expedidor de RG' },
        { grupo: "clientes", icone: 'fa fa-gavel', url: '',                          titulo: 'Profissões' },
        { grupo: "clientes", icone: 'fa fa-archive', url: '',                          titulo: 'Tipos de Endereço' }
      ]
    }
  ];

  $scope.navigarPara = function(pagina) {
    $location.url(pagina);
  };

}]);
