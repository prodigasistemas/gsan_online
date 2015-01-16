var app = angular.module("gsan");

app.controller("LogradourosEditController", ["Logradouro", "TipoLogradouro", "TituloLogradouro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "$filter", "$route", "Flash", function(Logradouro, TipoLogradouro, TituloLogradouro, Municipio, CadastroUrl, $scope, $http, $location, $filter, $route, Flash) {
  $scope.logradouro = Logradouro.get({id: $route.current.params.id}, function(data) {
   $scope.atualizaBairros();
  });
  $scope.bairro = {};
  $scope.cep = {};

  $scope.municipios = Municipio.query();
  $scope.tipo_logradouros = TipoLogradouro.query();
  $scope.titulo_logradouros = TituloLogradouro.query();

  $scope.atualizaBairros = function() {
    $scope.logradouro.municipio_id = $scope.logradouro.municipio.id;

    var query = $.param({ query: { muni_id: $scope.logradouro.municipio.id }, paginado: false });
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data.bairros;
      $scope.bairro = {}
    });
  };

  $scope.adicionaBairro = function(){
    if (bairroSelecionado()) { return; }
    $scope.logradouro.logradouro_bairros.push({bairro: $scope.bairro.selecionado});
  };

  $scope.removeBairro = function(logradouroBairro){
    if (logradouroBairro.id) {
      logradouroBairro._destroy = 1;
    } else {
      var index = $scope.logradouro.logradouro_bairros.indexOf(logradouroBairro);
      $scope.logradouro.logradouro_bairros.splice(index, 1);
    }
  };

  $scope.adicionarCEP = function(){
    if (cepSelecionado()) { return; }

    var query = $.param({ query: { codigo: $scope.cep.pesquisa } })
    $http.get(CadastroUrl() + "/ceps/search?" + query).success(function(data) {
      if(!data.cep){
        $scope.cep.resultado = "CEP não encontrado";
        return;
      }

      $scope.logradouro.logradouro_ceps.push({cep: data.cep});
      $scope.cep.pesquisa = "";
      $scope.cep.resultado = "";
    });
  };

  $scope.removerCEP = function(logradouroCep){
    if (logradouroCep.id) {
      logradouroCep._destroy = 1;
    } else {
      var index = $scope.logradouro.logradouro_ceps.indexOf(logradouroCep);
      $scope.logradouro.logradouro_ceps.splice(index, 1);
    }
  };

  $scope.submeter = function() {
    construirParametrosParaLogradouroCeps();
    construirParametrosParaBairros();

    var logradouro = new Logradouro({id: $scope.logradouro.id, logradouro: $scope.logradouro});
    logradouro.$update(function() {
      Flash.setMessage("Logradouro editado com sucesso");
      $location.url("/logradouros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }

  var cepSelecionado = function() {
    $scope.logadouro = $scope.logradouro || [];
    $scope.logadouro.logradouro_ceps = $scope.logradouro.logradouro_ceps || [];

    var ceps = $scope.logadouro.logradouro_ceps.map(function(logradouroCep) { return logradouroCep.cep.codigo; });
    var cepDuplicado = $scope.logradouro.logradouro_ceps.length && $filter('filter')(ceps, $scope.cep.pesquisa).length;
    if (cepDuplicado) {
      $scope.cep.resultado = "CEP já selecionado";
      return true;
    }
  };

  var bairroSelecionado = function() {
    $scope.logadouro = $scope.logradouro || [];
    $scope.logadouro.logradouro_bairros = $scope.logradouro.logradouro_bairros || [];

    var bairros = $scope.logadouro.logradouro_bairros.map(function(logradouroBairro) { return logradouroBairro.bairro.id; });
    var bairroDuplicado = $scope.logadouro.logradouro_bairros.length && $filter('filter')(bairros, $scope.bairro.selecionado.id).length;
    if (bairroDuplicado) {
      $scope.bairro.resultado = "Bairro já selecionado";
      return true;
    }
  };

  var construirParametrosParaLogradouroCeps = function() {
    $scope.logradouro.logradouro_ceps_attributes = {};

    $.each($scope.logradouro.logradouro_ceps, function(index, logradouro_cep) {
      $scope.logradouro.logradouro_ceps_attributes[index] = { id: logradouro_cep.id, cep_id: logradouro_cep.cep.id }
      if (!logradouro_cep.id) {
        $scope.logradouro.logradouro_ceps_attributes[index].ativo = 1;
      }

      if (logradouro_cep._destroy) {
        $scope.logradouro.logradouro_ceps_attributes[index]._destroy = 1;
      }
    });
  };

  var construirParametrosParaBairros = function() {
    $scope.logradouro.logradouro_bairros_attributes = {};

    $.each($scope.logradouro.logradouro_bairros, function(index, logradouro_bairro) {
      $scope.logradouro.logradouro_bairros_attributes[index] = { id: logradouro_bairro.id, bairro_id: logradouro_bairro.bairro_id }
      if (logradouro_bairro._destroy) {
        $scope.logradouro.logradouro_bairros_attributes[index]._destroy = 1;
      }
    });
  };
}]);
