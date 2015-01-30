var app = angular.module("gsan");

app.controller("CepsEditController", ["Cep", "CepTipo", "Municipio", "LogradouroTipo", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(Cep, CepTipo, Municipio, LogradouroTipo, CadastroUrl, $scope, $http, $location, Flash, $route) {
  $scope.cepTipos = CepTipo.query();
  $scope.municipios = Municipio.query();
  $scope.logradouro_tipos = LogradouroTipo.query();

  $http.get(CadastroUrl() + "/ceps/"+ $route.current.params.id +"/edit").success(function(data) {
    $scope.bairros = data.bairros;
    $scope.cep     = data.cep;
    $scope.cep.municipio = { nome: $scope.cep.municipio, uf: { descricao: $scope.cep.uf } }
  }).error(function(data, status) {
    if (status === 404) {
      $scope.objectNotFound = true;
      Flash.setMessage("danger", "Item não encontrado");
    }
  });

  $scope.atualizaBairros = function() {
    $scope.cep.bairro = "";
    $scope.cep.muni_id = $scope.cep.municipio.id;

    var query = $.param({ query: { municipio_id: $scope.cep.municipio.id}, paginado: false })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data.bairros;
    });
  }

  $scope.submeter = function() {
    var cep = new Cep({id: $scope.cep.id, cep: $scope.cep});
    cep.$update(function() {
      Flash.setMessage("success", "CEP atualizado com sucesso");
      $location.url("/ceps");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }
}]);
