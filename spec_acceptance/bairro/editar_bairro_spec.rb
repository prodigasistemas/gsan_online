require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar um bairro" do
    visit root_path

    click_link "Bairros"
    fill_in "bairro_codigo", with: "77"
    click_button "Pesquisar"

    find(".bairro:last-child").click_link "Editar"

    select "BELEM - PA",                from: "bairro_municipio_id"
    fill_in "bairro_codigo",            with: "12345"
    fill_in "bairro_nome",              with: "TAPANA"
    fill_in "bairro_codigo_prefeitura", with: "121"
    uncheck "bairro_ativo"

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro editado com sucesso"

    select_from_autocomplete("bel", "BELEM | PARA", "bairro_municipio_id")
    fill_in "bairro_codigo",            with: "12345"
    fill_in "bairro_nome",              with: "TAPANA"
    fill_in "bairro_codigo_prefeitura", with: "121"
    click_button "Pesquisar"

    expect(page).to have_content "BELEM"
    expect(page).to have_content "12345"
    expect(page).to have_content "TAPANA"
    expect(page).to have_content "121"
    expect(page).to have_css ".bairro_ativo", text: ""
  end
end
