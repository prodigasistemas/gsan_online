var app = angular.module("gsan");

app.controller("EnderecoTiposFormController", ["EnderecoTipo", "$scope", "$route", "Flash", "$location", function(EnderecoTipo, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.endereco_tipo = EnderecoTipo.get({id: $route.current.params.id});
  } else {
    $scope.endereco_tipo = new EnderecoTipo({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var endereco_tipo = new EnderecoTipo({id: $scope.endereco_tipo.id, endereco_tipo: $scope.endereco_tipo});
    endereco_tipo.$update(function() {
      Flash.setMessage("Tipo de endereço atualizado com sucesso");
      $location.url("/endereco_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var endereco_tipo = new EnderecoTipo({endereco_tipo: $scope.endereco_tipo});
    endereco_tipo.$save(function() {
      Flash.setMessage("Tipo de endereço criado com sucesso");
      $location.url("/endereco_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
