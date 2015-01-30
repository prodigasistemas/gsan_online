var app = angular.module("gsan");

app.factory("DistritoOperacional", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("distrito_operacionais");
}]);
