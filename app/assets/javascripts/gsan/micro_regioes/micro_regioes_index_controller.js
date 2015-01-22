var app = angular.module("gsan");

app.controller("MicroRegioesIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  
}]);
