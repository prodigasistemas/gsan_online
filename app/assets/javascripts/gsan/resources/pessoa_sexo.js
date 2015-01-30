var app = angular.module("gsan");

app.factory("PessoaSexo", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("pessoa_sexos");
}]);
