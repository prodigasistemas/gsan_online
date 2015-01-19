var app = angular.module("gsan");

app.controller("LogradourosIndexController", ["Municipio", "TituloLogradouro", "TipoLogradouro", "Flash", "$scope", "$http", "CadastroUrl", function(Municipio, TituloLogradouro, TipoLogradouro, Flash, $scope, $http, CadastroUrl) {
  $scope.flash = Flash;
  $scope.query = {};

  $scope.municipios = Municipio.query();
  $scope.titulo_logradouros = TituloLogradouro.query();
  $scope.tipo_logradouros = TipoLogradouro.query();
  $scope.municipioSelecionado = "";

  $scope.queryVazia = function() {
    for(var input in $scope.query) {
      if ($scope.query[input] !== "" && $scope.query[input] !== undefined) {
        return false;
      }
    }
    return true;
  }
  $scope.pesquisar = function() {
    var copiedQuery = jQuery.extend({}, $scope.query);
    $scope.queryCache = { query: copiedQuery };
    $scope.submeterPesquisa();
  }

  $scope.atualizarMunicipio = function($item, $model) {
    $scope.query.municipio_id = $item.id;
  }

  $scope.$watch("municipioSelecionado", function(newValue, oldValue) {
    if (newValue) {
      $scope.query.municipio_id = a.id;
      $scope.$digest();
    }
  })

  $scope.submeterPesquisa = function() {
    var query = $.param($scope.queryCache);
    $scope.loading = true;
    $http.get(CadastroUrl() + "/logradouros?" + query)
    .success(function(data) {
      $scope.logradouros = data.logradouros;
      $scope.page = data.page;
      $scope.loading = false;
    }).error(function() {
      $scope.loading = false;
    });
  }
}]);
