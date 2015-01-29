var app = angular.module("gsan");

app.factory("LogradouroTitulo", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var logradouroTitulos = $resource(CadastroUrl() + "/logradouro_titulos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).logradouro_titulos},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  logradouroTitulos.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/logradouro_titulos" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return logradouroTitulos;
}]);
