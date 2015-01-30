var app = angular.module("gsan");

app.directive('submitButton', function() {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      form: '='
    },
    templateUrl: "shared/submit_button.html",
    controller: ["$rootScope", "$scope", function($rootScope, $scope) {
      $scope.submittingRequests = false;

      $rootScope.$on("submitting_loader_hide", function() {
        $scope.submittingRequests = false;
      });

      $rootScope.$on("submitting_loader_show", function() {
        $scope.submittingRequests = true;
      });
    }]
  };
});
