var app = angular.module("gsan");

app.controller("ClientesEditController", ["$route", "EnderecoTipo", "EnderecoReferencia", "Municipio", "EsferaPoder", "RamoAtividade", "PessoaSexo", "Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
                                 function($route, EnderecoTipo, EnderecoReferencia, Municipio, EsferaPoder, RamoAtividade, PessoaSexo, Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

  $scope.cliente = Cliente.get({id: $route.current.params.id});

  $scope.submeter = function() {
    var cliente = new Cliente({id: $scope.cliente.id, cliente: $scope.cliente});
    cliente.$update(function() {
      Flash.setMessage("Cliente editado com sucesso");
      $location.url("/clientes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
