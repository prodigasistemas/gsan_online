var app = angular.module("gsan");

app.factory("OrgaoExpedidorRg", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var orgao = $resource(CadastroUrl() + "/orgaos_expedidores_rg/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return orgao;
}]);
