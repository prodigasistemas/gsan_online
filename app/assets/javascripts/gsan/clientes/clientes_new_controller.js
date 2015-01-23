var app = angular.module("gsan");

app.controller("ClientesNewController", ["EnderecoTipo", "EnderecoReferencia", "Municipio", "EsferaPoder", "RamoAtividade", "PessoaSexo", "Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
                                 function(EnderecoTipo, EnderecoReferencia, Municipio, EsferaPoder, RamoAtividade, PessoaSexo, Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

  $scope.cliente = { ativo: 1, gera_fatura_antecipada: 2, permite_negativacao: 2, enderecos: [] };

  $scope.submeter = function() {
    var cliente = new Cliente({cliente: $scope.cliente});
    cliente.$save(function() {
      Flash.setMessage("Cliente criado com sucesso");
      $location.url("/clientes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);







