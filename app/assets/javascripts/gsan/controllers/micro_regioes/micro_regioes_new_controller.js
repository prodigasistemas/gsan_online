var app = angular.module("gsan");

app.controller("MicroRegioesNewController", ["MicroRegiao", "Regiao", "Flash", "$scope", "$http", "CadastroUrl", "$location", function(MicroRegiao, Regiao, Flash, $scope, $http, CadastroUrl, $location) {
  $scope.flash = Flash;
  $scope.regioes = Regiao.query();
  $scope.microRegiao = {ativo: 1};

  $scope.submeter = function() {
    var microRegiao = new MicroRegiao({micro_regiao: $scope.microRegiao});

    microRegiao.$save(function() {
      Flash.setMessage("Micro Região criada com sucesso");
      $location.url("/micro_regioes");
    }, 
    function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
