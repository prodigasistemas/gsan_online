var app = angular.module("gsan");

app.controller("MunicipiosEditController", ["Municipio", "UnidadeFederacao", "MicroRegiao", "RegiaoDesenvolvimento", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(Municipio, UnidadeFederacao, MicroRegiao, RegiaoDesenvolvimento, CadastroUrl, $scope, $http, $location, Flash, $route) {
  $scope.municipio = Municipio.get({id: $route.current.params.id});
  $scope.unidade_federacoes = UnidadeFederacao.query();
  $scope.micro_regioes = MicroRegiao.query();
  $scope.regioes_desenvolvimento = RegiaoDesenvolvimento.query();

  $scope.submeter = function() {
    var municipio = new Municipio({municipio: $scope.municipio});
    municipio.$save(function() {
      Flash.setMessage("Município editado com sucesso");
      $location.url("/municipios");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
