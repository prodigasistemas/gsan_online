var app = angular.module("gsan");

app.controller("MainContentController", ["$rootScope", "$scope", "$location", function($rootScope, $scope, $location) {
  var showSidebar = function() {
    $scope.sidebarClasses = "col-sm-3 col-md-2 sidebar";
    $scope.mainContentClasses = "col-sm-9 col-md-10 main";
  };

  var hideSidebar = function() {
    $scope.sidebarClasses = "hide";
    $scope.mainContentClasses = "col-md-12 main full";
  };

  $rootScope.$on("$routeChangeSuccess", function() {
    ($location.url() === "/") ? hideSidebar() : showSidebar();
  });
}]);
