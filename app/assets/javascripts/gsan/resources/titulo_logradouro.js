var app = angular.module("gsan");

app.factory("TituloLogradouro", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var tituloLogradouros = $resource(CadastroUrl() + "/titulo_logradouros/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return tituloLogradouros;
}]);
