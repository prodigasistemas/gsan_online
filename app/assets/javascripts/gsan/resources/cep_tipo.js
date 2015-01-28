var app = angular.module("gsan");

app.factory("CepTipo", ["$resource", "$http", "CadastroUrl", function($resource, $http, CadastroUrl) {
  var cepTipo = $resource(CadastroUrl() + "/cep_tipos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).cep_tipos},
          isArray: true
      },
      'update': { method:'PUT', isArray: false }
    });

  cepTipo.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/cep_tipos" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return cepTipo;
}]);
