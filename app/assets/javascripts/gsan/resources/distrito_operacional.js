var app = angular.module("gsan");

app.factory("DistritoOperacional", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var distrito_operacional = $resource(CadastroUrl() + "/distrito_operacionais/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return distrito_operacional;
}]);
