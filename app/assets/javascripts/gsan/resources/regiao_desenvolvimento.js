var app = angular.module("gsan");

app.factory("RegiaoDesenvolvimento", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("regioes_desenvolvimento");
}]);
