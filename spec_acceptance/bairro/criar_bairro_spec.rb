require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar um bairro" do
    visit root_path

    click_link "Bairros"
    click_link "Criar Bairro"

    select "BELEM - PA",                 from: "bairro_municipio_id"
    fill_in "bairro_codigo",             with: "1010"
    fill_in "bairro_nome",               with: "JURUNAS"
    fill_in "bairro_codigo_prefeitura",  with: "212"
    check "bairro_ativo"

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro criado com sucesso"

    select "BELEM - PA",                from: "bairro_municipio_id"
    fill_in "bairro_codigo",            with: "1010"
    fill_in "bairro_nome",              with: "JURUNAS"
    fill_in "bairro_codigo_prefeitura", with: "212"    
    click_button "Pesquisar"

    expect(page).to have_content "BELEM"
    expect(page).to have_content "1010"
    expect(page).to have_content "JURUNAS"
    expect(page).to have_content "212"
    expect(page).to have_css ".bairro_ativo", text: "Sim"
  end
end