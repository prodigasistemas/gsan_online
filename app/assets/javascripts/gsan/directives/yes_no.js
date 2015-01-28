var app = angular.module("gsan");

app.directive('yesNo', function() {
  return {
    template: '<span class="label label-{{class}}">{{label}}</span>',
    scope: {
        yesNo: '=',
        yesLabel: '=',
        noLabel: '=',
    },
    controller: ["$scope", function($scope) {
      if ($scope.yesNo === 1) {
        $scope.label = $scope.yesLabel || "ativo";
        $scope.class = "success";
      } else if ($scope.yesNo === 2) {
        $scope.label = $scope.noLabel ||  "inativo";
        $scope.class = "danger";
      }
    }]
  };
});
