var app = angular.module("gsan");

app.controller("CepsNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", function(CadastroUrl, $scope, $http, $location, Flash) {
  $scope.cep = {ativo: 2};

  $http.get(CadastroUrl() + "/cep_tipos").success(function(data) {
    $scope.cepTipos = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $http.get(CadastroUrl() + "/tipo_logradouros").success(function(data) {
    $scope.tipo_logradouros = data;
  });

  $scope.cep = {};

  $scope.atualizaBairros = function() {
    $scope.cep.bairro = "";
    $scope.cep.muni_id = $scope.cep.municipio.id;

    var query = $.param({ query: { muni_id: $scope.cep.municipio.id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data.bairros;
    });
  }

  $scope.createCep = function() {
    $http.post(CadastroUrl() + "/ceps", { cep: $scope.cep })
    .success(function(data) {
      Flash.setMessage("CEP criado com sucesso");
      $location.url("/ceps");
    }).error(function(data, code) {
      $scope.formErrors = data;
    });
  }
}]);
