var app = angular.module("gsan");

app.controller("CepsNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", function(CadastroUrl, $scope, $http, $location, Flash) {
  $http.get(CadastroUrl() + "/cep_tipos").success(function(data) {
    $scope.cepTipos = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $http.get(CadastroUrl() + "/tipo_logradouros").success(function(data) {
    $scope.tipo_logradouros = data;
  });

  $scope.atualizaBairros = function() {
    var query = $.param({ query: { muni_id: $scope.cep.muni_id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data;
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
