var app = angular.module("gsan");

app.controller("ClientesNewController", ["Profissao", "OrgaoExpedidorRg", "UnidadeFederacao", "ClienteTipo", "breadcrumbs", "Cliente", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter",
                                 function(Profissao, OrgaoExpedidorRg, UnidadeFederacao, ClienteTipo, breadcrumbs, Cliente, CadastroUrl, $scope, $http, $location, Flash, $filter) {

  $scope.cliente = { ativo: 1 };
  $scope.breadcrumbs = breadcrumbs;

  $scope.profissoes = Profissao.query();
  $scope.clienteTipos = ClienteTipo.query();
  $scope.unidadeFederacoes = UnidadeFederacao.query();
  $scope.orgaosExpedidoresRg = OrgaoExpedidorRg.query();

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
