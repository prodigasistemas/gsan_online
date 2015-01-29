var app = angular.module("gsan");

app.controller("EnderecosReferenciaFormController", ["EnderecoReferencia", "$scope", "$route", "Flash", "$location", function(EnderecoReferencia, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.endereco_referencia = EnderecoReferencia.get({id: $route.current.params.id});
  } else {
    $scope.endereco_referencia = new EnderecoReferencia({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var endereco_referencia = new EnderecoReferencia({id: $scope.endereco_referencia.id, endereco_referencia: $scope.endereco_referencia});
    endereco_referencia.$update(function() {
      Flash.setMessage("Endereço de referência atualizado com sucesso");
      $location.url("/enderecos_referencia");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var endereco_referencia = new EnderecoReferencia({endereco_referencia: $scope.endereco_referencia});
    endereco_referencia.$save(function() {
      Flash.setMessage("Endereço de referência criado com sucesso");
      $location.url("/enderecos_referencia");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
