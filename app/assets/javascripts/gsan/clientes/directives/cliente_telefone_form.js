var app = angular.module("gsan");

app.directive('clienteTelefoneForm', function() {
  return {
    restrict: 'E',
    scope: {
      cliente: "="
    },
    templateUrl: "clientes/form/form_telefones.html",
    controller: ["$scope", "FoneTipo",
         function($scope, FoneTipo) {

      $scope.telefoneForm       = {};
      $scope.foneTipos          = FoneTipo.query();
      $scope.cliente.telefones  = $scope.cliente.telefones || [];

      $scope.mostrarAdicionarNovoTelefone = function(mostrar) {
        $scope.adicionandoNovoTelefone = mostrar;
      };

      $scope.removerTelefone = function(telefone) {
        if (telefone.id) {
          telefone._destroy = 1;
        } else {
          var index = $scope.cliente.telefones.indexOf(telefone);
          $scope.cliente.telefones.splice(index, 1);
        }
      };

      $scope.adicionarTelefone = function() {
        adicionarRelacionamentos($scope.telefone);
        $scope.cliente.telefones.push($scope.telefone);

        $scope.mostrarAdicionarNovoTelefone(false);
        $scope.telefone = {};
        $scope.telefoneForm.$setPristine();
      };

      var adicionarRelacionamentos = function(telefone) {
        $scope.telefone.fone_tipo_id = telefone.fone_tipo ? telefone.fone_tipo.id : undefined;
      };
    }]
  };
});
