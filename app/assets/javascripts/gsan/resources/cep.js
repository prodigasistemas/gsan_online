var app = angular.module("gsan");

app.factory("Cep", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("ceps");
}]);
