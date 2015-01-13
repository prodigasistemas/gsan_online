def cadastrar_cep
  fill_in "cep_codigo",           with: "66050381"
  select "ÚNICO",                 from: "cep_tipo_id"
  select "BELÉM",                 from: "cep_municipio_id"
  select "UMARIZAL",              from: "cep_bairro"
  select "PA",                    from: "cep_uf"
  select "RUA",                   from: "cep_tipo_logradouro"
  fill_in "cep_logradouro",       with: "OLIVEIRA-BELO"
  check "cep_ativo"

  click_button "Salvar CEP"
end