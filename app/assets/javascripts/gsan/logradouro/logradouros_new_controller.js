var app = angular.module("gsan");

app.controller("LogradourosNewController", ["CadastroUrl", "$scope", "$http", "$location", "Flash", function(CadastroUrl, $scope, $http, $location, Flash) {
  $scope.logradouro = {};
  $scope.bairro = {};
  $scope.logradouro.bairros = [];

  $scope.atualizaBairros = function() {
    var query = $.param({ query: { muni_id: $scope.logradouro.municipio.id} })
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data;
    });
  }

  $scope.adicionaBairro = function(){
    $scope.logradouro.bairros.push($scope.bairro);
  }

  $scope.removeBairro = function(bairro){
    var index = $scope.logradouro.bairros.indexOf(bairro);
    $scope.logradouro.bairros.splice(index, 1);
  }

  $scope.pesquisarMunicipio = function(search){
    if(search && search !== "" && search.length >= 3){
      var query = $.param({ query: { nome: search} });

      $http.get(CadastroUrl() + "/municipios?" + query).success(function(data) {
        $scope.municipios = data.municipios;
      });
    }
    else{
      $scope.municipios = [];
      $scope.logradouro.municipio = null;
    }
  }
}]);
