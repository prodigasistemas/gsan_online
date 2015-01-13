var app = angular.module("gsan");

app.controller("CepsIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $http.get(CadastroUrl() + "/ceps").success(function(data) {
    $scope.ceps = data;
  });
}]);
