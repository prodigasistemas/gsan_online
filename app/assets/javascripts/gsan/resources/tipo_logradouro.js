var app = angular.module("gsan");

app.factory("TipoLogradouro", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var tipoLogradouros = $resource(CadastroUrl() + "/tipo_logradouros/:tipoLogradourosId", { tipoLogradourosId: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return tipoLogradouros;
}]);
