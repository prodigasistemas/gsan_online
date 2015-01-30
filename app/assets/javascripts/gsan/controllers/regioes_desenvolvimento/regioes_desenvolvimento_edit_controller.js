var app = angular.module("gsan");

app.controller("RegioesDesenvolvimentoEditController", ["RegiaoDesenvolvimento", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(RegiaoDesenvolvimento, CadastroUrl, $scope, $http, $location, Flash, $route) {
  $scope.regiaoDesenvolvimento = RegiaoDesenvolvimento.get({id: $route.current.params.id}, function() {}, function(response) {
    if (response.status === 404) {
      $scope.objectNotFound = true;
      Flash.setMessage("danger", "Item não encontrado");
    }
  });

  $scope.submeter = function() {
    var regiaoDesenvolvimento = new RegiaoDesenvolvimento({id: $scope.regiaoDesenvolvimento.id, regiao_desenvolvimento: $scope.regiaoDesenvolvimento});

    regiaoDesenvolvimento.$update(function() {
      Flash.setMessage("Região de Desenvolvimento atualizada com sucesso");
      $location.url("/regioes_desenvolvimento");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
