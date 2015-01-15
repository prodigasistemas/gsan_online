var app = angular.module("gsan");

app.controller("MunicipiosIndexController", ["UnidadeFederacao", "MicroRegiao", "RegiaoDesenvolvimento", "Flash", "$scope", "$http", "CadastroUrl", function(UnidadeFederacao, MicroRegiao, RegiaoDesenvolvimento, Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $scope.unidade_federacoes = UnidadeFederacao.query();
  $scope.micro_regioes = MicroRegiao.query();
  $scope.regioes_desenvolvimento = RegiaoDesenvolvimento.query();

  $scope.queryVazia = function() {
    for (var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  }

  $scope.pagina = function(soma) {
    if ($scope.page.current_page + soma > $scope.page.total_pages ||
        $scope.page.current_page + soma < 1) {
      return
    }
    $scope.queryCache.page = $scope.page.current_page + soma;

    submeterPesquisa();
  }

  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({},$scope.query);
    $scope.queryCache = { query: copiedQuery };
    submeterPesquisa();
  }

  var submeterPesquisa = function() {
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
