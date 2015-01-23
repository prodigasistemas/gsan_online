var app = angular.module("gsan");

app.factory("Regiao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var regiao = $resource(CadastroUrl() + "/regioes/:id", { id: "@id" },
    {
      'query': {
        method: 'GET',
        transformResponse: function (data) {return angular.fromJson(data).regioes},
        isArray: true
      },
      'update': { method:'PUT', isArray: false }
    }
  );

  return regiao;
}]);