var app = angular.module("gsan");

app.factory("EnderecoTipo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var tipo = $resource(CadastroUrl() + "/endereco_tipos/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return tipo;
}]);
