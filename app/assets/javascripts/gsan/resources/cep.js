var app = angular.module("gsan");

app.factory("Cep", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var cep = $resource(CadastroUrl() + "/ceps/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return cep;
}]);
