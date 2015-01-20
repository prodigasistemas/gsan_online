var app = angular.module("gsan");

app.controller("BairrosNewController", ["Bairro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "Flash", "breadcrumbs", function(Bairro, Municipio, CadastroUrl, $scope, $http, $location, Flash, breadcrumbs) {
  $scope.bairro = {ativo: 1};
  $scope.breadcrumbs = breadcrumbs;
  $scope.municipios = Municipio.query();

  $scope.atualizaMunicipioId = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;
  };

  $scope.submeter = function() {
    var bairro = new Bairro({bairro: $scope.bairro});
    bairro.$save(function() {
      Flash.setMessage("Bairro criado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
