var app = angular.module("gsan");

app.controller("EsferasPoderFormController", ["EsferaPoder", "$scope", "$route", "Flash", "$location", function(EsferaPoder, $scope, $route, Flash, $location) {
  if (id = $route.current.params.id) {
    $scope.esfera_poder = EsferaPoder.get({id: $route.current.params.id});
  } else {
    $scope.esfera_poder = new EsferaPoder({ permite_gerar_certidao_negativa_imovel: 2,
                                            permite_gerar_certidao_negativa_cliente: 2,
                                            ativo: 1 });
  }

  $scope.submeter = function() {
    if ($route.current.params.id) {
      atualizar();
    } else {
      criar();
    }
  };

  var atualizar = function() {
    var esfera = new EsferaPoder({id: $scope.esfera_poder.id, esfera_poder: $scope.esfera_poder});
    esfera.$update(function() {
      Flash.setMessage("success", "Esfera de poder atualizada com sucesso");
      $location.url("/esferas_poder");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };

  var criar = function() {
    var esfera = new EsferaPoder({esfera_poder: $scope.esfera_poder});
    esfera.$save(function() {
      Flash.setMessage("Esfera de poder criada com sucesso");
      $location.url("/esferas_poder");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  };
}]);
