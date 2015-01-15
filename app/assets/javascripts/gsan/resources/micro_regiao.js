var app = angular.module("gsan");

app.factory("MicroRegiao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var microRegiao = $resource(CadastroUrl() + "/micro_regioes/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return microRegiao;
}]);
