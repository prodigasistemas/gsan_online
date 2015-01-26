def select_from_autocomplete(term, select, id)
  within "##{id}" do
    find("button").click
    find("input.ui-select-search").set(term)
    click_link(select)
  end
end

def seleciona_logradouro(cidade: nil, nome: nil, nome_popular: nil)
  click_link "Selecionar logradouro"

  select_from_autocomplete(cidade[0..2], cidade, "pesquisa_logradouro_municipios")
  fill_in "pesquisa_logradouro_nome", with: nome[0..2]
  fill_in "pesquisa_logradouro_nome_popular", with: nome_popular[0..2]
  click_link "Pesquisar logradouro"

  within "tr[data-logradouro-nome='#{nome}']" do
    click_link "Selecionar"
  end
end

def adicionar_cliente_endereco(params)
  click_link "Adicionar novo endereço"

  within "#cliente_endereco_logradouro" do
    seleciona_logradouro(cidade: params[:cidade], nome: params[:logradouro_nome], nome_popular: params[:logradouro_nome_popular])
  end

  select params[:tipo], from: "cliente_endereco_tipo"
  select params[:bairro], from: "cliente_endereco_bairro"
  select params[:cep], from: "cliente_endereco_cep"
  select params[:referencia], from: "cliente_endereco_referencia"
  fill_in "cliente_endereco_numero", with: params[:numero]
  fill_in "cliente_endereco_complemento", with: params[:complemento]

  within "#cliente_endereco_perimetro_inicial" do
    seleciona_logradouro(cidade: params[:cidade], nome: params[:perimetro_inicial_nome], nome_popular: params[:perimetro_inicial_nome_popular])
  end

  within "#cliente_endereco_perimetro_final" do
    seleciona_logradouro(cidade: params[:cidade], nome: params[:perimetro_final_nome], nome_popular: params[:perimetro_final_nome_popular])
  end

  click_link "Adicionar endereço"

  within "table#enderecos tbody tr:last-child" do
    expect(page).to have_content params[:logradouro_nome]
    expect(page).to have_content params[:tipo]
    expect(page).to have_content params[:cep]
    expect(page).to have_content "#{params[:referencia]} #{params[:numero]}"
    expect(page).to have_content params[:bairro]
    expect(page).to have_content params[:complemento]
    expect(page).to have_content params[:perimetro_inicial_nome]
    expect(page).to have_content params[:perimetro_final_nome]
  end
end


def assert_radio_checked(parent_selector)
  expect(page).to have_css "#{parent_selector} input[checked]"
end


def assert_radio_not_checked(parent_selector)
  expect(find("#{parent_selector} input[type='radio']")[:checked]).to be_nil
end
