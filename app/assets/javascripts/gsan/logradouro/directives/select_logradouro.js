var app = angular.module("gsan");

app.directive('selectLogradouro', function() {
  return {
    restrict: 'E',
    scope: {
      logradouroSelecionado: "=",
      municipios: "=?"
    },
    templateUrl: "logradouros/select_logradouro.html",
    controller: ["Municipio", "$scope", "$http", "CadastroUrl", function(Municipio, $scope, $http, CadastroUrl) {
      $scope.pesquisaLogradouro = {};

      if (!$scope.municipios) {
        $scope.municipios = Municipio.query();
      };

      $scope.mostrarPesquisandoLogradouro = function(mostrar) {
        $scope.pesquisandoLogradouro = mostrar;
      };

      $scope.pesquisarLogradouro = function() {
        var copiedQuery = jQuery.extend({}, $scope.pesquisaLogradouro);
        $scope.logradouroQueryCache = { query: copiedQuery };
        $scope.submeterPesquisaLogradouro();
        $scope.logradouros = [];
      };

      $scope.submeterPesquisaLogradouro = function() {
        var query = $.param($scope.logradouroQueryCache);
        $scope.loadingLogradouro = true;

        $http.get(CadastroUrl() + "/logradouros?" + query)
        .success(function(data) {
          $scope.logradouros = data.logradouros;
          $scope.logradourosPage = data.page;
          $scope.loadingLogradouro = false;
        }).error(function() {
          $scope.loadingLogradouro = false;
        });
      };

      $scope.selecionarLogradouro = function(logradouro) {
        $scope.logradouros = [];
        $scope.logradouroSelecionado = logradouro;
        $scope.mostrarPesquisandoLogradouro(false);
      };

      $scope.apagarLogradouro = function() {
        $scope.logradouroSelecionado = null;
      }
    }]
  };
});
