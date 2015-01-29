var app = angular.module("gsan");

app.factory("EnderecoReferencia", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var referencia = $resource(CadastroUrl() + "/enderecos_referencia/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).enderecos_referencia},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  referencia.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/enderecos_referencia" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return referencia;
}]);
