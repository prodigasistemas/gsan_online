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
        { grupo: "enderecos", url: '/ceps',                     titulo: 'CEPs' },
        { grupo: "enderecos", url: '/municipios',               titulo: 'Municípios' },
        { grupo: "enderecos", url: '/bairros',                  titulo: 'Bairros' },
        { grupo: "enderecos", url: '/logradouros',              titulo: 'Logradouros' },
        { grupo: "enderecos", url: '/micro_regioes',            titulo: 'Micro Regiões' },
        { grupo: "enderecos", url: '/regioes',                  titulo: 'Regiões' },
        { grupo: "enderecos", url: '/regioes_desenvolvimento',  titulo: 'Regiões de Desenvolvimento' },
        { grupo: "enderecos", url: '',                          titulo: 'Unidade de Federação' },
        { grupo: "enderecos", url: '',                          titulo: 'Tipos de CEP' },
        { grupo: "enderecos", url: '',                          titulo: 'Títulos de Logradouros' },
        { grupo: "enderecos", url: '',                          titulo: 'Tipos de logradouros' }
      ]
    },{
      titulo: "Clientes",
      items: [
        { grupo: "clientes", url: '/clientes',                 titulo: 'Clientes' },
        { grupo: "clientes", url: '',                          titulo: 'Tipos de clientes' },
        { grupo: "clientes", url: '',                          titulo: 'Esferas de poder' },
        { grupo: "clientes", url: '',                          titulo: 'Endereço de Referência' },
        { grupo: "clientes", url: '',                          titulo: 'Ramos de Atividades' },
        { grupo: "clientes", url: '',                          titulo: 'Órgão Expedidor de RG' },
        { grupo: "clientes", url: '',                          titulo: 'Profissões' },
        { grupo: "clientes", url: '',                          titulo: 'Tipos de Endereço' }
      ]
    }
  ];

  $scope.navigarPara = function(pagina) {
    $location.url(pagina);
  };

}]);
