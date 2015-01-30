var app = angular.module("gsan");

app.factory("Bairro", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("bairros");
}]);
