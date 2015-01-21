var app = angular.module("gsan");

app.factory("EsferaPoder", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var esfera = $resource(CadastroUrl() + "/esferas_poder/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return esfera;
}]);
