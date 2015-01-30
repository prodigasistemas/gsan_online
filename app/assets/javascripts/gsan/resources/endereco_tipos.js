var app = angular.module("gsan");

app.factory("EnderecoTipo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("endereco_tipos");
}]);
