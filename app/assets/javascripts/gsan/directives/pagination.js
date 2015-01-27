var app = angular.module("gsan");

app.directive('pagination', function() {
  return {
    restrict: 'E',
    scope: {
      submeterPesquisa: '=',
      queryCache: '=',
      page: '='
    },
    templateUrl: "shared/pagination.html",
    controller: function($scope) {
      $scope.pagina = function(soma) {
        if ($scope.page.current_page + soma > $scope.page.total_pages ||
            $scope.page.current_page + soma < 1) {
          return;
        }
        $scope.queryCache.page = $scope.page.current_page + soma;
        $scope.submeterPesquisa($scope.queryCache);
      }
    }
  };
});
