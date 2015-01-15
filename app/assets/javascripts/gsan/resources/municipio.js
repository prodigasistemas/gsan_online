var app = angular.module("gsan");

app.factory("Municipio", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var municipio = $resource(CadastroUrl() + "/municipios/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).municipios},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  return municipio;
}]);
