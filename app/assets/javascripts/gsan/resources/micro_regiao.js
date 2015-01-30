var app = angular.module("gsan");

app.factory("MicroRegiao", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("micro_regioes");
}]);
