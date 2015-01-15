var app = angular.module("gsan");

app.factory("CepTipo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var cepTipo = $resource(CadastroUrl() + "/cep_tipos/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return cepTipo;
}]);
