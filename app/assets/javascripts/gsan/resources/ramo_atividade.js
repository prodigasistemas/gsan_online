var app = angular.module("gsan");

app.factory("RamoAtividade", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var ramo = $resource(CadastroUrl() + "/ramos_atividades/:id", { id: "@id" },
    {
      'update': { method:'PUT', isArray: false }
    }
  );

  return ramo;
}]);
