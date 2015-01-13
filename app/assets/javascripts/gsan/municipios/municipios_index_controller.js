var app = angular.module("gsan");

app.controller("MunicipiosIndexController", ["Flash", "$scope", "$http", "CadastroUrl", function(Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data;
  });
}]);
