var app = angular.module("gsan");

app.factory("FoneTipo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var tipo = $resource(CadastroUrl() + "/fone_tipos/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return tipo;
}]);
