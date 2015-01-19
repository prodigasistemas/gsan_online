var app = angular.module("gsan");

app.controller("MunicipiosNewController", ["Municipio", "UnidadeFederacao", "MicroRegiao", "RegiaoDesenvolvimento", "CadastroUrl", "$scope", "$http", "$location", "Flash", function(Municipio, UnidadeFederacao, MicroRegiao, RegiaoDesenvolvimento, CadastroUrl, $scope, $http, $location, Flash) {
  $scope.municipio = {};
  $scope.unidade_federacoes = UnidadeFederacao.query();
  $scope.micro_regioes = MicroRegiao.query();
  $scope.regioes_desenvolvimento = RegiaoDesenvolvimento.query();

  $scope.municipio = {ativo: 1};

  $scope.submeter = function() {
    var municipio = new Municipio({municipio: $scope.municipio});
    municipio.$save(function() {
      Flash.setMessage("Município criado com sucesso");
      $location.url("/municipios");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
