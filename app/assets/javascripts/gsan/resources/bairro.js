var app = angular.module("gsan");

app.factory("Bairro", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var bairro = $resource(CadastroUrl() + "/bairros/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return bairro;
}]);
