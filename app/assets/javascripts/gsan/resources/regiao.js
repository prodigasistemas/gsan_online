var app = angular.module("gsan");

app.factory("Regiao", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("regioes");
}]);
