var app = angular.module("gsan");

app.factory("Profissao", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var profissao = $resource(CadastroUrl() + "/profissoes/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    });

  return profissao;
}]);
