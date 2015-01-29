require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar um CEP" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("CEPs")

    fill_in "cep_codigo", with: "66666666"
    click_button "Pesquisar"
    find('tr.cep:last-child a').click

    fill_in "cep_codigo",           with: "66050383"
    select "ÚNICO",                 from: "cep_tipo_id"
    select_from_autocomplete("bel", "BELEM | PARA", "cep_municipio_id")
    select "UMARIZAL",              from: "cep_bairro"
    select "RUA",                   from: "cep_logradouro_tipo"
    fill_in "cep_logradouro",       with: "OLIVEIRA-BELO"
    uncheck "cep_ativo"

    click_button "Salvar CEP"

    expect(page).to have_content "CEP atualizado com sucesso"

    fill_in "cep_codigo",           with: "66050383"
    fill_in "filtro_municipio",        with: "bel"
    fill_in "filtro_bairro",           with: "umar"
    fill_in "filtro_logradouro",       with: "oliv"
    select "RUA",                   from: "cep_logradouro_tipo"
    select "ÚNICO",                 from: "cep_tipo_id"
    select "PA",                    from: "cep_uf"
    click_button "Pesquisar"

    expect(page).to have_content "66050383"
    expect(page).to have_content "ÚNICO"
    expect(page).to have_content "BELEM"
    expect(page).to have_content "UMARIZAL"
    expect(page).to have_content "RUA"
    expect(page).to have_content "OLIVEIRA-BELO"
    expect(page).to have_css ".cep_ativo", text: "inativo"
  end
end
