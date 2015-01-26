var app = angular.module("gsan");

app.directive('formErrors', function() {
  return {
    restrict: 'E',
    scope: {
      formErrors: '='
    },
    templateUrl: "shared/form_errors.html"
  };
});
