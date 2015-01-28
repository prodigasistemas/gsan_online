var app = angular.module("gsan");

app.factory("CepTipo", ["$resource", "CadastroUrl", function($resource, CadastroUrl) {
  var cepTipo = $resource(CadastroUrl() + "/cep_tipos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).cep_tipos},
          isArray: true
      },
      'update': { method:'PUT', isArray: false }
    });

  return cepTipo;
}]);
