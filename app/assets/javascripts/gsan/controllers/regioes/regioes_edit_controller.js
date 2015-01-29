var app = angular.module("gsan");

app.controller("RegioesEditController", ["Regiao", "Flash", "$scope", "$http", "CadastroUrl", "$location", "$route", function(Regiao, Flash, $scope, $http, CadastroUrl, $location, $route) {
  $scope.regiao = Regiao.get({id: $route.current.params.id});

  $scope.submeter = function() {
    var regiao = new Regiao({id: $scope.regiao.id, regiao: $scope.regiao});

    regiao.$update(function() {
      Flash.setMessage("Região atualizada com sucesso");
      $location.url("/regioes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
