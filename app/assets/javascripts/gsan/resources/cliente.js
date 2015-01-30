var app = angular.module("gsan");

app.factory("Cliente", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("clientes");
}]);
