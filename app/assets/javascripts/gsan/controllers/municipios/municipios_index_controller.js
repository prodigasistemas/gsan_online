var app = angular.module("gsan");

app.controller("MunicipiosIndexController", ["UnidadeFederacao", "MicroRegiao", "RegiaoDesenvolvimento", "Flash", "$scope", "$http", "CadastroUrl", function(UnidadeFederacao, MicroRegiao, RegiaoDesenvolvimento, Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $scope.unidade_federacoes = UnidadeFederacao.query();

  $http.get(CadastroUrl() + "/micro_regioes").success(function(data) {
    $scope.micro_regioes = data.micro_regioes;
  });

  $scope.regioes_desenvolvimento = RegiaoDesenvolvimento.query();
  
  $scope.queryVazia = function() {
    for (var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  }

  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({},$scope.query);
    $scope.queryCache = { query: copiedQuery };
    $scope.submeterPesquisa();
  }

  $scope.submeterPesquisa = function() {
    var query = $.param($scope.queryCache);
    $scope.loading = true;
    $http.get(CadastroUrl() + "/municipios?" + query)
    .success(function(data) {
      $scope.municipios = data.municipios;
      $scope.page = data.page
      $scope.loading = false;
    }).error(function() {
      $scope.loading = false;
    });
  }
}]);
