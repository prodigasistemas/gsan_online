var app = angular.module("gsan");

app.factory("CepTipo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("cep_tipos");
}]);
