var app = angular.module("gsan");

app.factory("OrgaoExpedidorRg", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("orgaos_expedidores_rg");
}]);
