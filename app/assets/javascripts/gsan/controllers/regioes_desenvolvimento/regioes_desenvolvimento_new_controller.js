var app = angular.module("gsan");

app.controller("RegioesDesenvolvimentoNewController", ["RegiaoDesenvolvimento", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter", function(RegiaoDesenvolvimento, CadastroUrl, $scope, $http, $location, Flash, $filter) {
  $scope.regiaoDesenvolvimento = {ativo: 1};

  $scope.submeter = function() {
    var regiaoDesenvolvimento = new RegiaoDesenvolvimento({regiao_desenvolvimento: $scope.regiaoDesenvolvimento});

    regiaoDesenvolvimento.$save(function() {
      Flash.setMessage("Região de Desenvolvimento criada com sucesso");
      $location.url("/regioes_desenvolvimento");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
