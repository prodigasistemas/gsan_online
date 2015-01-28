var app = angular.module("gsan");

app.factory("Profissao", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var profissao = $resource(CadastroUrl() + "/profissoes/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).profissoes},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  profissao.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/profissoes" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return profissao;
}]);
