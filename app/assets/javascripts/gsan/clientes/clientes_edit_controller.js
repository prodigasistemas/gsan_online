var app = angular.module("gsan");

app.controller("ClientesEditController", ["$route", "EnderecoTipo", "EnderecoReferencia", "Municipio", "EsferaPoder", "RamoAtividade", "PessoaSexo", "Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
                                 function($route, EnderecoTipo, EnderecoReferencia, Municipio, EsferaPoder, RamoAtividade, PessoaSexo, Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

  $scope.cliente = Cliente.get({id: $route.current.params.id}, function(data) {

  });

  $scope.profissoes           = Profissao.query();
  $scope.clienteTipos         = ClienteTipo.query();
  $scope.unidadeFederacoes    = UnidadeFederacao.query();
  $scope.orgaosExpedidoresRg  = OrgaoExpedidorRg.query();
  $scope.pessoaSexos          = PessoaSexo.query();
  $scope.ramosAtividades      = RamoAtividade.query();
  $scope.esferasPoder         = EsferaPoder.query();
  $scope.municipios           = Municipio.query();
  $scope.endereco_referencias = EnderecoReferencia.query();
  $scope.enderecoTipos        = EnderecoTipo.query();

  $scope.endereco = {};
  $scope.pesquisarNovoResponsavelSuperior = false;
  $scope.adicionandoNovoEndereco = false;

  $scope.mostrarPesquisaNovoResponsavelSuperior = function(mostrar) {
    $scope.pesquisarNovoResponsavelSuperior = mostrar;
  };

  $scope.mostrarAdicionarNovoEndereco = function(mostrar) {
    $scope.adicionandoNovoEndereco = mostrar;
  };

  $scope.adicionarEndereco = function() {
    $scope.cliente.enderecos.push($scope.endereco);
    $scope.mostrarAdicionarNovoEndereco(false);
    $scope.endereco = {};
  };

  $scope.removerEndereco = function(endereco) {
    var index = $scope.cliente.enderecos.indexOf(endereco);
    $scope.cliente.enderecos.splice(index, 1);
  }

  $scope.pesquisarClienteResponsavel = function() {
    var copiedQuery = jQuery.extend({}, $scope.cliente_responsavel_superior);
    $scope.clienteResponsavelQueryCache = { query: copiedQuery };
    $scope.submeterPesquisaClienteResponsavel();
  };

  $scope.submeterPesquisaClienteResponsavel = function() {
    var query = $.param($scope.clienteResponsavelQueryCache);
    $scope.loadingClientesResponsaveis = true;
    $http.get(CadastroUrl() + "/clientes?" + query)
    .success(function(data) {
      $scope.responsaveisSuperiores = data.clientes;
      $scope.clienteResponsabelPage = data.page;
      $scope.loadingClientesResponsaveis = false;
    }).error(function() {
      $scope.loadingClientesResponsaveis = false;
    });
  };

  $scope.selecionarResponsavelSuperior = function(responsavelSuperior) {
    $scope.responsaveisSuperiores = [];
    $scope.cliente.responsavelSuperior = responsavelSuperior;
    $scope.cliente.responsavel_superior_id = responsavelSuperior.id;
    $scope.pesquisarNovoResponsavelSuperior = false;
  };

  $scope.submeter = function() {
    if ($("#pesquisa_cliente_responsavel input:focus").length) {
      $scope.submeterPesquisaClienteResponsavel();
      return;
    };

    if ($("#endereco_form input:focus").length) {
      $scope.adicionarEndereco();
      return;
    };

    var cliente = new Cliente({id: $scope.cliente.id, cliente: $scope.cliente});
    cliente.$update(function() {
      Flash.setMessage("Cliente criado com sucesso");
      $location.url("/clientes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
