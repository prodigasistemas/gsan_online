var app = angular.module("gsan");

app.controller("RamosAtividadeFormController", ["RamoAtividade", "$scope", "$route", "Flash", "$location", function(RamoAtividade, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.ramo_atividade = RamoAtividade.get({id: $route.current.params.id});
  } else {
    $scope.ramo_atividade = new RamoAtividade({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var ramo_atividade = new RamoAtividade({id: $scope.ramo_atividade.id, ramo_atividade: $scope.ramo_atividade});
    ramo_atividade.$update(function() {
      Flash.setMessage("Ramo de atividade atualizado com sucesso");
      $location.url("/ramos_atividade");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var ramo_atividade = new RamoAtividade({ramo_atividade: $scope.ramo_atividade});
    ramo_atividade.$save(function() {
      Flash.setMessage("Ramo de atividade criado com sucesso");
      $location.url("/ramos_atividade");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
