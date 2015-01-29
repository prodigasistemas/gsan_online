require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar titulos de logradouro" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Títulos de Logradouro")

    fill_in "logradouro_titulo_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".logradouro_titulo:last-child a").click

    fill_in "logradouro_titulo_descricao",                    with: "PIPA PAPAO"
    fill_in "logradouro_titulo_descricao_abreviada",          with: "LOK"
    fill_in "logradouro_titulo_descricao_abreviada_completa", with: "CAPITAO AMERICA"
    uncheck "logradouro_titulo_ativo"

    click_button "Salvar Título de Logradouro"

    expect(page).to have_content "Título de logradouro atualizado com sucesso"

    fill_in "logradouro_titulo_descricao",                    with: "papa"
    fill_in "logradouro_titulo_descricao_abreviada",          with: "lo"
    fill_in "logradouro_titulo_descricao_abreviada_completa", with: "cap"

    click_button "Pesquisar"

    within ".logradouro_titulo" do
      expect(page).to have_content "PIPA PAPAO"
      expect(page).to have_content "LOK"
      expect(page).to have_content "CAPITAO AMERI"
      expect(page).to have_css ".logradouro_titulo_ativo", text: "inativo"
    end
  end
end
