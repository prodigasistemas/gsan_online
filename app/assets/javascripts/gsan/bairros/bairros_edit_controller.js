var app = angular.module("gsan");

app.controller("BairrosEditController", ["Bairro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", "breadcrumbs", function(Bairro, Municipio, CadastroUrl, $scope, $http, $location, Flash, $route, breadcrumbs) {
  $scope.bairro = Bairro.get({id: $route.current.params.id}, function(data) {
    $scope.atualizaMunicipioId();
  });
  $scope.municipios = Municipio.query();
  $scope.breadcrumbs = breadcrumbs;

  $scope.atualizaMunicipioId = function() {
    $scope.bairro.municipio_id = $scope.bairro.municipio.id;
  };

  $scope.submeter = function() {
    var bairro = new Bairro({id: $scope.bairro.id, bairro: $scope.bairro});
    bairro.$update(function() {
      Flash.setMessage("Bairro editado com sucesso");
      $location.url("/bairros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
