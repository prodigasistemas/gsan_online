var app = angular.module("gsan");

app.directive('yesNo', function() {
  return {
    template: '{{ yesNo === 1 ? "Sim" : "" }}',
    scope: {
        yesNo: '='
    }
  };
});
