var app = angular.module("gsan");

app.factory("Logradouro", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("logradouros");
}]);
