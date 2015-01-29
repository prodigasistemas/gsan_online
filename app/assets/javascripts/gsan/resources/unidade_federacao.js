var app = angular.module("gsan");

app.factory("UnidadeFederacao", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var uf = $resource(CadastroUrl() + "/unidade_federacoes/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).unidade_federacoes},
          isArray: true
      },
      'update': { method:'PUT', isArray: false }
    });

  uf.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/unidade_federacoes" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return uf;
}]);
