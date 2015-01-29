var app = angular.module("gsan");

app.factory("LogradouroTipo", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var logradouroTipos = $resource(CadastroUrl() + "/logradouro_tipos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).logradouro_tipos},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  logradouroTipos.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/logradouro_tipos" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return logradouroTipos;
}]);
