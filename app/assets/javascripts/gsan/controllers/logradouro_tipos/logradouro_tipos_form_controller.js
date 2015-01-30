var app = angular.module("gsan");

app.controller("LogradouroTiposFormController", ["LogradouroTipo", "$scope", "$route", "Flash", "$location", function(LogradouroTipo, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.logradouro_tipo = LogradouroTipo.get({id: $route.current.params.id}, function() {}, function(response) {
      if (response.status === 404) {
        $scope.objectNotFound = true;
        Flash.setMessage("danger", "Item não encontrado");
      }
    });
  } else {
    $scope.logradouro_tipo = new LogradouroTipo({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var logradouro_tipo = new LogradouroTipo({id: $scope.logradouro_tipo.id, logradouro_tipo: $scope.logradouro_tipo});
    logradouro_tipo.$update(function() {
      Flash.setMessage("Tipo de logradouro atualizado com sucesso");
      $location.url("/logradouro_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var logradouro_tipo = new LogradouroTipo({logradouro_tipo: $scope.logradouro_tipo});
    logradouro_tipo.$save(function() {
      Flash.setMessage("Tipo de logradouro criado com sucesso");
      $location.url("/logradouro_tipos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
