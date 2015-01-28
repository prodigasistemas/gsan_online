var app = angular.module("gsan");

app.controller("CepTiposFormController", ["CepTipo", "$scope", "$route", "Flash", "$location", function(CepTipo, $scope, $route, Flash, $location) {
  var id;

  if (id = $route.current.params.id) {
    $scope.cepTipo = CepTipo.get({id: id});
  } else {
    $scope.cepTipo = new CepTipo({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizarCepTipo();
    } else {
      criarCepTipo();
    }
  };

  var atualizarCepTipo = function() {
    var tipo = new CepTipo({id: $scope.cepTipo.id, cep_tipo: $scope.cepTipo});
    tipo.$update(function() {
      Flash.setMessage("success", "Tipo de CEP atualizado com sucesso");
      $location.url("/cep_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criarCepTipo = function() {
    var tipo = new CepTipo({cep_tipo: $scope.cepTipo});
    tipo.$save(function() {
      Flash.setMessage("Tipo de CEP criado com sucesso");
      $location.url("/cep_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
