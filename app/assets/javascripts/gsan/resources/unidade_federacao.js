var app = angular.module("gsan");

app.factory("UnidadeFederacao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var uf = $resource(CadastroUrl() + "/unidade_federacoes/:ufId", { ufId: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).unidade_federacoes},
          isArray: true
      },
      'update': { method:'PUT', isArray: false }
    });

  return uf;
}]);
