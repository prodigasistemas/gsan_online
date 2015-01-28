var app = angular.module("gsan");

app.factory("EsferaPoder", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var esfera = $resource(CadastroUrl() + "/esferas_poder/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).esferas_poder},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });


  esfera.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/esferas_poder" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return esfera;
}]);
