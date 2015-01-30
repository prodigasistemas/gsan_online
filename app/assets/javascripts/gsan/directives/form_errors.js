var app = angular.module("gsan");

app.directive('formErrors', function() {
  return {
    restrict: 'E',
    scope: {
      formErrors: '='
    },
    templateUrl: "shared/form_errors.html",
    controller: ["$scope", function($scope) {
      $scope.$watch("formErrors", function(newValue, oldValue) {
        if (newValue && newValue.length > 0) {
          $("body").animate({ scrollTop: $('#page-header').offset().top }, "slow");
        }
      });
    }]
  };
});
