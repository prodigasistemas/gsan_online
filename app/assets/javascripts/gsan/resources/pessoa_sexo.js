var app = angular.module("gsan");

app.factory("PessoaSexo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var sexo = $resource(CadastroUrl() + "/pessoa_sexos/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return sexo;
}]);
