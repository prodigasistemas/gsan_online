var app = angular.module("gsan");

app.controller("ProfissoesFormController", ["Profissao", "$scope", "$route", "Flash", "$location", function(Profissao, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.profissao = Profissao.get({id: $route.current.params.id});
  } else {
    $scope.profissao = new Profissao({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var profissao = new Profissao({id: $scope.profissao.id, profissao: $scope.profissao});
    profissao.$update(function() {
      Flash.setMessage("success", "Profissão atualizada com sucesso");
      $location.url("/profissoes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var profissao = new Profissao({profissao: $scope.profissao});
    profissao.$save(function() {
      Flash.setMessage("Profissão criada com sucesso");
      $location.url("/profissoes");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
