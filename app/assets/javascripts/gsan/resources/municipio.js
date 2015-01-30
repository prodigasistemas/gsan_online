var app = angular.module("gsan");

app.factory("Municipio", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("municipios");
}]);
