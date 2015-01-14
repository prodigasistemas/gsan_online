require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar bairros" do
    visit root_path

    click_link "Bairros"
    click_link "Criar Bairro"

    select "BELEM - PA",                 from: "bairro_municipio_id"
    fill_in "bairro_codigo",             with: "0101"
    fill_in "bairro_nome",               with: "NOVA BELEM"
    fill_in "bairro_codigo_prefeitura",  with: "212"
    check "bairro_ativo"

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro criado com sucesso"
  end
end