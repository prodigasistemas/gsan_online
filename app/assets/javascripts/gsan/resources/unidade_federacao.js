var app = angular.module("gsan");

app.factory("UnidadeFederacao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var uf = $resource(CadastroUrl() + "/unidade_federacoes/:ufId", { ufId: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return uf;
}]);
