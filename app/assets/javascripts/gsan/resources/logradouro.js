var app = angular.module("gsan");

app.factory("Logradouro", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var logradouro = $resource(CadastroUrl() + "/logradouros/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).logradouros},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  return logradouro;
}]);
