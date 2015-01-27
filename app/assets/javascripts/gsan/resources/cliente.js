var app = angular.module("gsan");

app.factory("Cliente", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var cliente = $resource(CadastroUrl() + "/clientes/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).clientes},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    }
  );


  cliente.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/clientes" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return cliente;
}]);
