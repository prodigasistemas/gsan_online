var app = angular.module("gsan");

app.directive('yesNo', function() {
  return {
    template: '{{ yesNo ? "Sim" : "" }}',
    scope: {
        yesNo: '='
    }
  };
});
