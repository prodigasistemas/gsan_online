var app = angular.module("gsan");

app.controller("OrgaosExpedidoresRgFormController", ["OrgaoExpedidorRg", "$scope", "$route", "Flash", "$location", function(OrgaoExpedidorRg, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.orgao_expedidor_rg = OrgaoExpedidorRg.get({id: $route.current.params.id});
  } else {
    $scope.orgao_expedidor_rg = new OrgaoExpedidorRg({ ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var orgao_expedidor_rg = new OrgaoExpedidorRg({id: $scope.orgao_expedidor_rg.id, orgao_expedidor_rg: $scope.orgao_expedidor_rg});
    orgao_expedidor_rg.$update(function() {
      Flash.setMessage("Órgão expedidor de RG atualizado com sucesso");
      $location.url("/orgaos_expedidores_rg");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var orgao_expedidor_rg = new OrgaoExpedidorRg({orgao_expedidor_rg: $scope.orgao_expedidor_rg});
    orgao_expedidor_rg.$save(function() {
      Flash.setMessage("Órgão expedidor de RG criado com sucesso");
      $location.url("/orgaos_expedidores_rg");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
