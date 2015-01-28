var app = angular.module("gsan");

app.factory("RamoAtividade", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var ramo = $resource(CadastroUrl() + "/ramos_atividades/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).ramos_atividade},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    }
  );

  ramo.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/ramos_atividades" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return ramo;
}]);
