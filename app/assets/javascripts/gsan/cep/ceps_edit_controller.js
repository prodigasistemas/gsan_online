var app = angular.module("gsan");

app.controller("CepsEditController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", "$filter", function(CadastroUrl, $scope, $http, $location, Flash, $route, $filter) {
  var id = $route.current.params.id;
  $http.get(CadastroUrl() + "/cep_tipos").success(function(data) {
    $scope.cepTipos = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $http.get(CadastroUrl() + "/tipo_logradouros").success(function(data) {
    $scope.tipo_logradouros = data;
  });

  $http.get(CadastroUrl() + "/ceps/"+ id +"/edit").success(function(data) {
    $scope.bairros = data.bairros;
    $scope.cep     = data.cep;
    $scope.cep.municipio = { nome: $scope.cep.municipio, uf: { descricao: $scope.cep.uf } }
  });

  $scope.atualizaBairros = function() {
    $scope.cep.bairro = "";
    $scope.cep.muni_id = $scope.cep.municipio.id;

    var query = $.param({ query: { muni_id: $scope.cep.municipio.id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data.bairros;
    });
  }

  $scope.atualizaCep = function() {
    $http.put(CadastroUrl() + "/ceps/" + id, { cep: $scope.cep })
    .success(function(data) {
      Flash.setMessage("CEP atualizado com sucesso");
      $location.url("/ceps");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
