var app = angular.module("gsan");

app.controller("MunicipiosEditController", ["Municipio", "UnidadeFederacao", "MicroRegiao", "RegiaoDesenvolvimento", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(Municipio, UnidadeFederacao, MicroRegiao, RegiaoDesenvolvimento, CadastroUrl, $scope, $http, $location, Flash, $route) {
  $scope.municipio = Municipio.get({id: $route.current.params.id}, function() {}, function(response) {
    if (response.status === 404) {
      $scope.objectNotFound = true;
      Flash.setMessage("danger", "Item não encontrado");
    }
  });
  
  $scope.unidade_federacoes = UnidadeFederacao.query();
  
  $http.get(CadastroUrl() + "/micro_regioes").success(function(data) {
    $scope.micro_regioes = data.micro_regioes;
  });

  $scope.regioes_desenvolvimento = RegiaoDesenvolvimento.query();

  $scope.submeter = function() {
    var municipio = new Municipio({id: $scope.municipio.id, municipio: $scope.municipio});
    municipio.$update(function() {
      Flash.setMessage("Município editado com sucesso");
      $location.url("/municipios");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
