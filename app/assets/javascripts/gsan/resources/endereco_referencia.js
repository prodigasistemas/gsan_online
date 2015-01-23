var app = angular.module("gsan");

app.factory("EnderecoReferencia", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var referencia = $resource(CadastroUrl() + "/endereco_referencias/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return referencia;
}]);
