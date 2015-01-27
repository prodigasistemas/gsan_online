var app = angular.module("gsan");

app.factory("ClienteTipo", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var clienteTipo = $resource(CadastroUrl() + "/cliente_tipos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).cliente_tipos},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  clienteTipo.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/cliente_tipos" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return clienteTipo;
}]);
