var app = angular.module("gsan");

app.directive('pageHeader', function() {
  return {
    restrict: 'E',
    scope: {
      titulo: '@'
    },
    templateUrl: "shared/page_header.html"
  };
});
