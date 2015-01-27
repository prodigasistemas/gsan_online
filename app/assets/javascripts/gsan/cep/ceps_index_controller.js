var app = angular.module("gsan");

app.controller("CepsIndexController", ["Cep", "CepTipo", "Municipio", "TipoLogradouro", "UnidadeFederacao", "$scope", "$http", "CadastroUrl", function(Cep, CepTipo, Municipio, TipoLogradouro, UnidadeFederacao, $scope, $http, CadastroUrl) {
  $scope.query = {};
  $scope.cepTipos = CepTipo.query();
  $scope.municipios = Municipio.query();
  $scope.tipo_logradouros = TipoLogradouro.query();
  $scope.unidade_federacoes = UnidadeFederacao.query();

  $scope.queryVazia = function() {
    for (var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  };

  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({},$scope.query);
    $scope.queryCache = { query: copiedQuery, page: 1 };
    $scope.submeterPesquisa();
  };

  $scope.submeterPesquisa = function() {
    var query = $.param($scope.queryCache);
    $scope.loading = true;
    $http.get(CadastroUrl() + "/ceps?" + query)
    .success(function(data) {
      $scope.ceps = data.ceps;
      $scope.page = data.page
      $scope.loading = false;
    }).error(function() {
    });
  };
}]);
