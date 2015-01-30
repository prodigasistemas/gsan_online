var app = angular.module("gsan");

app.factory("Profissao", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("profissoes");
}]);

