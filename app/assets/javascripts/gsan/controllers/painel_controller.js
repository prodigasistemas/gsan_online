var app = angular.module("gsan");

app.controller("PainelController", ["$route", "$scope", "$location", function($route, $scope, $location) {
  $scope.filtro = $route.current.params.filtro || '';

  $scope.modulos = [
    { url: '/cadastro/painel', icone: "plus",         titulo: "Cadastro" },
    { url: '',                 icone: "money",        titulo: "Financeiro" },
    { url: '',                 icone: "dollar",       titulo: "Cobrança" },
    { url: '',                 icone: "line-chart",   titulo: "Micro Medição" },
    { url: '',                 icone: "credit-card",  titulo: "Faturamento" }
  ];

  $scope.grupos = [{
      titulo: "Endereços",
      items: [
        { grupo: "enderecos", icone: 'fa fa-envelope',        url: '/ceps',                     titulo: 'CEPs' },
        { grupo: "enderecos", icone: 'fa fa fa-building',     url: '/municipios',               titulo: 'Municípios' },
        { grupo: "enderecos", icone: 'fa fa-flag',            url: '/bairros',                  titulo: 'Bairros' },
        { grupo: "enderecos", icone: 'fa fa-location-arrow',  url: '/logradouros',              titulo: 'Logradouros' },
        { grupo: "enderecos", icone: 'fa fa-tree',            url: '/micro_regioes',            titulo: 'Micro Regiões' },
        { grupo: "enderecos", icone: 'fa fa-photo',           url: '/regioes',                  titulo: 'Regiões' },
        { grupo: "enderecos", icone: 'fa fa-sun-o',           url: '/regioes_desenvolvimento',  titulo: 'Regiões de Desenvolvimento' },
        { grupo: "enderecos", icone: 'fa fa-university',      url: '',                          titulo: 'Unidade de Federação' },
        { grupo: "enderecos", icone: 'fa fa-envelope-square', url: '/cep_tipos',                titulo: 'Tipos de CEP' },
        { grupo: "enderecos", icone: 'fa fa-text-height',     url: '',                          titulo: 'Títulos de Logradouro' },
        { grupo: "enderecos", icone: 'fa fa-cubes',           url: '',                          titulo: 'Tipos de Logradouro' }
      ]
    },{
      titulo: "Clientes",
      items: [
        { grupo: "clientes", icone: 'fa fa-users',          url: '/clientes',               titulo: 'Clientes' },
        { grupo: "clientes", icone: 'fa fa-cubes',          url: '/cliente_tipos',          titulo: 'Tipos de Clientes' },
        { grupo: "clientes", icone: 'fa fa-circle',         url: '/esferas_poder',          titulo: 'Esferas de Poder' },
        { grupo: "clientes", icone: 'fa fa-map-marker' ,    url: '/enderecos_referencia',   titulo: 'Endereços de Referência' },
        { grupo: "clientes", icone: 'fa fa-gavel',          url: '/ramos_atividade',        titulo: 'Ramos de Atividade' },
        { grupo: "clientes", icone: 'fa fa-university',     url: '/orgaos_expedidores_rg',  titulo: 'Órgãos Expedidores de RG' },
        { grupo: "clientes", icone: 'fa fa-graduation-cap', url: '/profissoes',             titulo: 'Profissões' },
        { grupo: "clientes", icone: 'fa fa-home',           url: '/endereco_tipos',         titulo: 'Tipos de Endereço' }
      ]
    }
  ];

  $scope.navigarPara = function(pagina) {
    if (pagina) {
      $location.url(pagina);
    }
  };

}]);
