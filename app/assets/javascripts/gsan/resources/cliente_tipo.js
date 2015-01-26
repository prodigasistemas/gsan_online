var app = angular.module("gsan");

app.factory("ClienteTipo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var clienteTipo = $resource(CadastroUrl() + "/cliente_tipos/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return clienteTipo;
}]);
