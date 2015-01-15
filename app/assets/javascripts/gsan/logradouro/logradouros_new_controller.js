var app = angular.module("gsan");

app.controller("LogradourosNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter", function(CadastroUrl, $scope, $http, $location, Flash, $filter) {
  $scope.logradouro = {};
  $scope.bairro = {};
  $scope.logradouro.bairros = [];
  $scope.logradouro.ceps = [];

  $http.get(CadastroUrl() + "/tipo_logradouros").success(function(data) {
    $scope.tipo_logradouros = data;
  });

  $http.get(CadastroUrl() + "/titulo_logradouros").success(function(data) {
    $scope.titulo_logradouros = data;
  });

  $http.get(CadastroUrl() + "/municipios").success(function(data) {
    $scope.municipios = data.municipios;
  });

  $scope.adicionaBairro = function(){
    $scope.logradouro.bairros.push($scope.bairro);
  }

  $scope.removeBairro = function(bairro){
    var index = $scope.logradouro.bairros.indexOf(bairro);
    $scope.logradouro.bairros.splice(index, 1);
  }

  $scope.atualizaBairros = function() {
    var query = $.param({ query: { muni_id: $scope.logradouro.municipio.id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data;
    });
  }

  $scope.adicionarCEP = function(){
    var query = $.param({ query: { codigo: $scope.cep.pesquisa } })
    $http.get(CadastroUrl() + "/ceps/search?" + query).success(function(data) {
      if(!data.cep){
        $scope.cep.resultado = "CEP não encontrado";
        return;
      }

      $scope.logradouro.ceps.push(data.cep);
      $scope.cep.pesquisa = "";
      $scope.cep.resultado = "";
    });
  }

  $scope.removerCEP = function(cep){
    var index = $scope.logradouro.ceps.indexOf(cep);
    $scope.logradouro.ceps.splice(index, 1);
  }
}]);
