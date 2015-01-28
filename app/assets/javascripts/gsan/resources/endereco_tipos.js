var app = angular.module("gsan");

app.factory("EnderecoTipo", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var tipo = $resource(CadastroUrl() + "/endereco_tipos/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).endereco_tipos},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  tipo.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/endereco_tipos" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return tipo;
}]);
