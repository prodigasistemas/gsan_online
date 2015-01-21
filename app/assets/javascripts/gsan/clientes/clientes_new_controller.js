var app = angular.module("gsan");

app.controller("ClientesNewController", ["EsferaPoder", "RamoAtividade", "PessoaSexo", "Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
                                 function(EsferaPoder, RamoAtividade, PessoaSexo, Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

  $scope.cliente = { ativo: 1, gera_fatura_antecipada: 2, permite_negativacao: 2 };

  $scope.profissoes          = Profissao.query();
  $scope.clienteTipos        = ClienteTipo.query();
  $scope.unidadeFederacoes   = UnidadeFederacao.query();
  $scope.orgaosExpedidoresRg = OrgaoExpedidorRg.query();
  $scope.pessoaSexos         = PessoaSexo.query();
  $scope.ramosAtividades     = RamoAtividade.query();
  $scope.esferasPoder        = EsferaPoder.query();

  $scope.cliente_responsavel_superior = {};
  $scope.pesquisarNovoResponsavelSuperior = false;

  $scope.mostrarPesquisaNovoResponsavelSuperior = function() {
    $scope.pesquisarNovoResponsavelSuperior = true;
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

    var cliente = new Cliente({cliente: $scope.cliente});
    cliente.$save(function() {
      Flash.setMessage("Cliente criado com sucesso");
      $location.url("/clientes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
