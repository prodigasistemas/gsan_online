// http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/

var app = angular.module("gsan");

app.factory("RailsResource", ["$resource", "CadastroUrl", "$http", function($resource, CadastroUrl, $http) {
  return function(name) {
    var resource = $resource(CadastroUrl() + "/" + name + "/:id", { id: "@id" },
      {
        'query': {
            method: 'GET',
            transformResponse: function (data) {return angular.fromJson(data)[name]},
            isArray: true
          },
        'update': { method:'PUT', isArray: false }
      });

    resource.search = function(query, successCallback, errorCallback) {
      var paramQuery = query ? "?" + $.param(query) : "";
      $http.get(CadastroUrl() + "/" + name + paramQuery)
      .success(function(data) {
        if (successCallback) { successCallback(data); }
      }).error(function(data) {
        if (errorCallback)   { errorCallback(data); }
      });
    }

    return resource;
  }
}]);
