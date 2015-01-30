var app = angular.module("gsan");

app.factory("LogradouroTitulo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("logradouro_titulos");
}]);
