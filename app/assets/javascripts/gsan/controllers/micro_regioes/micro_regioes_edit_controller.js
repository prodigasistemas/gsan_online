var app = angular.module("gsan");

app.controller("MicroRegioesEditController", ["MicroRegiao", "Regiao", "Flash", "$scope", "$http", "CadastroUrl", "$location", "$route", function(MicroRegiao, Regiao, Flash, $scope, $http, CadastroUrl, $location, $route) {
  $scope.regioes = Regiao.query();
  $scope.microRegiao = MicroRegiao.get({id: $route.current.params.id});

  $scope.submeter = function() {
    var microRegiao = new MicroRegiao({id: $scope.microRegiao.id, micro_regiao: $scope.microRegiao});

    microRegiao.$update(function() {
      Flash.setMessage("Micro Região atualizada com sucesso");
      $location.url("/micro_regioes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
