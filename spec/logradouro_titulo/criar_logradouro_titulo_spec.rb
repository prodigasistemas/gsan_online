require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar titulos de logradouro" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Títulos de Logradouro")

    click_link "Criar Título de Logradouro"

    fill_in "logradouro_titulo_descricao",                    with: "CALLE"
    fill_in "logradouro_titulo_descricao_abreviada",          with: "ARR"
    fill_in "logradouro_titulo_descricao_abreviada_completa", with: "MILLA"
    uncheck "logradouro_titulo_ativo"

    click_button "Salvar Título de Logradouro"

    expect(page).to have_content "Título de logradouro criado com sucesso"

    fill_in "logradouro_titulo_descricao",                    with: "cal"
    fill_in "logradouro_titulo_descricao_abreviada",          with: "ar"
    fill_in "logradouro_titulo_descricao_abreviada_completa", with: "mi"

    click_button "Pesquisar"

    within ".logradouro_titulo" do
      expect(page).to have_content "CALLE"
      expect(page).to have_content "ARR"
      expect(page).to have_content "MILLA"
      expect(page).to have_css ".logradouro_titulo_ativo", text: "inativo"
    end
  end
end
