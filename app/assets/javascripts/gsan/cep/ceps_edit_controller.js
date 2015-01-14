var app = angular.module("gsan");

app.controller("CepsEditController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", "$route", function(CadastroUrl, $scope, $http, $location, Flash, $route) {
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

  $http.get(CadastroUrl() + "/unidade_federacoes").success(function(data) {
    $scope.unidade_federacoes = data;
  });

  $http.get(CadastroUrl() + "/ceps/"+ id +"/edit").success(function(data) {
    $scope.bairros = data.bairros;
    $scope.cep = data.cep;
  });

  $scope.atualizaBairros = function() {
    var query = $.param({ query: { muni_id: $scope.cep.muni_id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data;
      $scope.cep.bairro = "";
    });
  }

  $scope.updateCep = function() {
    $http.put(CadastroUrl() + "/ceps/" + id, { cep: $scope.cep })
    .success(function(data) {
      Flash.setMessage("CEP atualizado com sucesso");
      $location.url("/ceps");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
