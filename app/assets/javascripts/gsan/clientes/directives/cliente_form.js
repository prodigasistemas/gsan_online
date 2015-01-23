var app = angular.module("gsan");

app.directive('clienteForm', function() {
  return {
    restrict: 'E',
    scope: {
      cliente: "=",
      submeter: "="
    },
    templateUrl: "clientes/form.html",
    controller: ["EnderecoTipo", "EnderecoReferencia", "Municipio", "EsferaPoder", "RamoAtividade", "PessoaSexo", "Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
         function(EnderecoTipo, EnderecoReferencia, Municipio, EsferaPoder, RamoAtividade, PessoaSexo, Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

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

      $scope.cliente_responsavel_superior = {};
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
        if (endereco.id) {
          endereco._destroy = true;
        } else {
          var index = $scope.cliente.enderecos.indexOf(endereco);
          $scope.cliente.enderecos.splice(index, 1);
        }
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

      $scope.prepararSubmeter = function() {
        if ($("#pesquisa_cliente_responsavel input:focus").length) {
          $scope.submeterPesquisaClienteResponsavel();
          return;
        };

        if ($("#endereco_form input:focus").length) {
          $scope.adicionarEndereco();
          return;
        };

        gerarAtributosDeEnderecos();

        $scope.submeter();
      }

      var gerarAtributosDeEnderecos = function() {
        $scope.cliente.enderecos_attributes = [];

        var enderecos = $scope.cliente.enderecos;
        $.each(enderecos, function(index, endereco) {
          if (!endereco._destroy) {
            endereco.logradouro_id        = endereco.logradouro         ?  endereco.logradouro.id         : undefined
            endereco.endereco_tipo_id     = endereco.endereco_tipo      ?  endereco.endereco_tipo.id      : undefined
            endereco.logradouro_bairro_id = endereco.logradouro_bairro  ?  endereco.logradouro_bairro.id  : undefined
            endereco.logradouro_cep_id    = endereco.logradouro_cep     ?  endereco.logradouro_cep.id     : undefined
            endereco.referencia_id        = endereco.referencia         ?  endereco.referencia.id         : undefined
            endereco.perimetro_inicial_id = endereco.perimetro_inicial  ?  endereco.perimetro_inicial.id  : undefined
            endereco.perimetro_final_id   = endereco.perimetro_final    ?  endereco.perimetro_final.id    : undefined
          }
          $scope.cliente.enderecos_attributes.push(endereco)
        });
      };
    }]
  };
});