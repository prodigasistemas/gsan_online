var app = angular.module("gsan");

app.controller("ClienteTiposFormController", ["EsferaPoder", "ClienteTipo", "$scope", "$route", "Flash", "$location", function(EsferaPoder, ClienteTipo, $scope, $route, Flash, $location) {
  $scope.esferasPoder    = EsferaPoder.query();
  $scope.pessoaTipos     = [{descricao: "Pessoa Física", id: 1}, {descricao: "Pessoa Jurídica", id: 2}];

  var id;
  if (id = $route.current.params.id) {
    $scope.cliente_tipo = ClienteTipo.get({id: id});
  } else {
    $scope.cliente_tipo = new ClienteTipo({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizarClienteTipo();
    } else {
      criarClienteTipo();
    }
  };

  var atualizarClienteTipo = function() {
    var tipo = new ClienteTipo({id: $scope.cliente_tipo.id, cliente_tipo: $scope.cliente_tipo});
    tipo.$update(function() {
      Flash.setMessage("success", "Tipo de cliente atualizado com sucesso");
      $location.url("/cliente_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criarClienteTipo = function() {
    var tipo = new ClienteTipo({cliente_tipo: $scope.cliente_tipo});
    tipo.$save(function() {
      Flash.setMessage("Tipo de cliente criado com sucesso");
      $location.url("/cliente_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
