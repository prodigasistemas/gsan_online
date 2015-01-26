var app = angular.module("gsan");

app.factory("Cliente", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var cliente = $resource(CadastroUrl() + "/clientes/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).clientes},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    }
  );

  return cliente;
}]);
