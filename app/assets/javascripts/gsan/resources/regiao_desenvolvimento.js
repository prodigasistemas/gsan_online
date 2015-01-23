var app = angular.module("gsan");

app.factory("RegiaoDesenvolvimento", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var regiaoDesenvolvimento = $resource(CadastroUrl() + "/regioes_desenvolvimento/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).regioesDesenvolvimento},
          isArray: true
      },
      'update': { method:'PUT', isArray: false }
    }
  );

  return regiaoDesenvolvimento;
}]);
