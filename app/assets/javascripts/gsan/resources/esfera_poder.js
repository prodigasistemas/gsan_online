var app = angular.module("gsan");

app.factory("EsferaPoder", ["RailsResource", "CadastroUrl", "$http", function(RailsResource, CadastroUrl, $http) {
  return RailsResource("esferas_poder");
}]);
