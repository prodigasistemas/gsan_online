var app = angular.module("gsan");

app.controller("LogradourosNewController", ["Logradouro", "TipoLogradouro", "TituloLogradouro", "Municipio", "CadastroUrl", "$scope", "$http", "$location", "Flash", "$filter", function(Logradouro, TipoLogradouro, TituloLogradouro, Municipio, CadastroUrl, $scope, $http, $location, Flash, $filter) {
  $scope.logradouro = { ativo: 2 };
  $scope.bairro = {};
  $scope.logradouro.bairros = [];
  $scope.logradouro.ceps = [];

  $scope.municipios = Municipio.query();
  $scope.tipo_logradouros = TipoLogradouro.query();
  $scope.titulo_logradouros = TituloLogradouro.query();

  $scope.adicionaBairro = function(){
    if (bairroSelecionado()) { return; }
    $scope.logradouro.bairros.push($scope.bairro);
  };

  $scope.removeBairro = function(bairro){
    var index = $scope.logradouro.bairros.indexOf(bairro);
    $scope.logradouro.bairros.splice(index, 1);
  };

  $scope.atualizaBairros = function() {
    $scope.logradouro.municipio_id = $scope.logradouro.municipio.id;

    var query = $.param({ query: { muni_id: $scope.logradouro.municipio.id} });
    $http.get(CadastroUrl() + "/bairros?" + query).success(function(data) {
      $scope.bairros = data.bairros;
    });
  };

  $scope.adicionarCEP = function(){
    if (cepSelecionado()) { return; }

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
  };

  $scope.removerCEP = function(cep){
    var index = $scope.logradouro.ceps.indexOf(cep);
    $scope.logradouro.ceps.splice(index, 1);
  };

  $scope.submeter = function() {
    construirParametrosParaCeps();
    construirParametrosParaBairros();

    var logradouro = new Logradouro({logradouro: $scope.logradouro});
    logradouro.$save(function() {
      Flash.setMessage("Logradouro criado com sucesso");
      $location.url("/logradouros");
    }, function(response) {
      $scope.formErrors = response.data.errors;
    });
  }

  var cepSelecionado = function() {
    $scope.logadouro = $scope.logradouro || [];
    var cepDuplicado = $scope.logadouro.ceps.length && $filter('filter')($scope.logadouro.ceps, {codigo: $scope.cep.pesquisa}).length;
    if (cepDuplicado) {
      $scope.cep.resultado = "CEP já selecionado";
      return true;
    }
  };

  var bairroSelecionado = function() {
    $scope.logadouro = $scope.logradouro || [];

    var cepDuplicado = $scope.logadouro.bairros.length && $filter('filter')($scope.logadouro.bairros, {id: $scope.bairro.id}).length;
    if (cepDuplicado) {
      $scope.bairro.resultado = "Bairro já selecionado";
      return true;
    }
  };

  var construirParametrosParaCeps = function() {
    $scope.logradouro.logradouro_ceps_attributes = {};

    $.each($scope.logradouro.ceps, function(index, cep) {
      var id = Math.ceil(100000000*Math.random());
      $scope.logradouro.logradouro_ceps_attributes[id] = { cep_id: cep.id, ativo: true }
    });
  };

  var construirParametrosParaBairros = function() {
    $scope.logradouro.logradouro_bairros_attributes = {};

    $.each($scope.logradouro.bairros, function(index, bairro) {
      var id = Math.ceil(100000000*Math.random());
      $scope.logradouro.logradouro_bairros_attributes[id] = { bairro_id: bairro.bairro }
    });
  };
}]);
