var app = angular.module("gsan");

app.factory("FoneTipo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("fone_tipos");
}]);
