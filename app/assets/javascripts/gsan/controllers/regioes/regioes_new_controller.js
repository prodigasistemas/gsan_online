var app = angular.module("gsan");

app.controller("RegioesNewController", ["Regiao", "Flash", "$scope", "$http", "CadastroUrl", "$location", function(Regiao, Flash, $scope, $http, CadastroUrl, $location) {
  $scope.regioes = Regiao.query();
  $scope.regiao = {ativo: 1};

  $scope.submeter = function() {
    var regiao = new Regiao({regiao: $scope.regiao});

    regiao.$save(function() {
      Flash.setMessage("Região criada com sucesso");
      $location.url("/regioes");
    },
    function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
