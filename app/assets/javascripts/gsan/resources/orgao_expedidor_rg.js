var app = angular.module("gsan");

app.factory("OrgaoExpedidorRg", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  var orgao = $resource(CadastroUrl() + "/orgaos_expedidores_rg/:id", { id: "@id" },
    {
      'query': {
          method: 'GET',
          transformResponse: function (data) {return angular.fromJson(data).orgaos_expedidores_rg},
          isArray: true
        },
      'update': { method:'PUT', isArray: false }
    });

  orgao.search = function(query, successCallback, errorCallback) {
    var paramQuery = query ? "?" + $.param(query) : "";
    $http.get(CadastroUrl() + "/orgaos_expedidores_rg" + paramQuery)
    .success(function(data) {
      if (successCallback) { successCallback(data); }
    }).error(function(data) {
      if (errorCallback)   { errorCallback(data); }
    });
  }

  return orgao;
}]);
