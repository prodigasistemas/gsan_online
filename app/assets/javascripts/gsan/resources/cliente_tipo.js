var app = angular.module("gsan");

app.factory("ClienteTipo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("cliente_tipos");
}]);
