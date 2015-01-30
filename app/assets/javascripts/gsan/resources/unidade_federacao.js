var app = angular.module("gsan");

app.factory("UnidadeFederacao", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("unidade_federacoes");
}]);
