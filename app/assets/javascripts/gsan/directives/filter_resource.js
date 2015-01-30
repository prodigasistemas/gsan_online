var app = angular.module("gsan");

app.directive('filterResource', function() {
  return {
    restrict: 'E',
    scope: {
      submeterPesquisa: '=',
      queryCache: '=',
      src: "=",
      filterOptions: "=",
      page: "="
    },
    template: "<div ng-include='src'>a</div>",
    controller: ["$scope", function($scope) {
      $scope.query = { };

      $scope.queryVazia = function() {
        for(var input in $scope.query) {
          if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
            return false;
          }
        }
        return true;
      };

      $scope.pesquisar = function() {
        var copiedQuery = jQuery.extend({}, $scope.query);
        $scope.queryCache = { query: copiedQuery };
        $scope.submeterPesquisa($scope.queryCache);
      };
    }]
  };
});
