var app = angular.module("gsan");

app.controller("UnidadeFederacoesFormController", ["UnidadeFederacao", "$scope", "$route", "Flash", "$location", function(UnidadeFederacao, $scope, $route, Flash, $location) {
  var id;

  if (id = $route.current.params.id) {
    $scope.unidadeFederacao = UnidadeFederacao.get({id: id}, function() {}, function(response) {
      if (response.status === 404) {
        $scope.objectNotFound = true;
        Flash.setMessage("danger", "Item não encontrado");
      }
    });
  } else {
    $scope.unidadeFederacao = new UnidadeFederacao({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizarUF();
    } else {
      criarUF();
    }
  };

  var atualizarUF = function() {
    var uf = new UnidadeFederacao({id: $scope.unidadeFederacao.id, unidade_federacao: $scope.unidadeFederacao});
    uf.$update(function() {
      Flash.setMessage("success", "Unidade da Federação atualizada com sucesso");
      $location.url("/unidade_federacoes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criarUF = function() {
    var tipo = new UnidadeFederacao({unidade_federacao: $scope.unidadeFederacao});
    tipo.$save(function() {
      Flash.setMessage("Unidade da Federação criada com sucesso");
      $location.url("/unidade_federacoes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
