var app = angular.module("gsan");

app.factory("EnderecoReferencia", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("enderecos_referencia");
}]);
