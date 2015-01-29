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

      $scope.selecionaTelefonePadrao = function(telefonePadrao) {
        $.each($scope.cliente.telefones, function(index, telefone) {
          telefone.padrao = 2;
        });
        telefonePadrao.padrao = 1
      };

      $scope.adicionarTelefone = function() {
        adicionarAtributos($scope.telefone);
        $scope.cliente.telefones.push($scope.telefone);

        $scope.mostrarAdicionarNovoTelefone(false);
        $scope.telefone = {};
        $scope.telefoneForm.$setPristine();
      };

      var adicionarAtributos = function(telefone) {
        $scope.telefone.fone_tipo_id = telefone.fone_tipo ? telefone.fone_tipo.id : undefined;
        $scope.telefone.padrao = $scope.cliente.telefones.length === 0 ? 1 : 2;
      };
    }]
  };
});
