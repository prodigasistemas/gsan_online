var app = angular.module("gsan");

app.factory("Regiao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var regiao = $resource(CadastroUrl() + "/regioes/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return regiao;
}]);