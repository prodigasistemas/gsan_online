var app = angular.module("gsan");

app.factory("LogradouroTipo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("logradouro_tipos");
}]);
