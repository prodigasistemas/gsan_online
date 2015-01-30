var app = angular.module("gsan");

app.controller("LogradouroTitulosFormController", ["LogradouroTitulo", "$scope", "$route", "Flash", "$location", function(LogradouroTitulo, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.logradouro_titulo = LogradouroTitulo.get({id: $route.current.params.id}, function() {}, function(response) {
      if (response.status === 404) {
        $scope.objectNotFound = true;
        Flash.setMessage("danger", "Item não encontrado");
      }
    });
  } else {
    $scope.logradouro_titulo = new LogradouroTitulo({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var logradouro_titulo = new LogradouroTitulo({id: $scope.logradouro_titulo.id, logradouro_titulo: $scope.logradouro_titulo});
    logradouro_titulo.$update(function() {
      Flash.setMessage("Título de logradouro atualizado com sucesso");
      $location.url("/logradouro_titulos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var logradouro_titulo = new LogradouroTitulo({logradouro_titulo: $scope.logradouro_titulo});
    logradouro_titulo.$save(function() {
      Flash.setMessage("Título de logradouro criado com sucesso");
      $location.url("/logradouro_titulos");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
