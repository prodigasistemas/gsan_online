require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar bairros" do
    visit root_path

    click_link "Bairros"
    fill_in "bairro_codigo", with: "77"
    click_button "Pesquisar"

    find(".bairro:last-child").click_link "Editar"

    fill_in "bairro_codigo_prefeitura", with: "2121"
    fill_in "bairro_nome",              with: "TESTE"
    select "BELEM - PA",               from: "bairro_municipio_id"
    uncheck "bairro_ativo"

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro editado com sucesso"
  end
end
