var app = angular.module("gsan");

app.factory("RamoAtividade", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("ramos_atividade");
}]);

