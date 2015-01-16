var app = angular.module("gsan");

app.factory("TituloLogradouro", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var tituloLogradouros = $resource(CadastroUrl() + "/tipo_logradouros/:tipoLogradourosId", { tipoLogradourosId: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return tituloLogradouros;
}]);
