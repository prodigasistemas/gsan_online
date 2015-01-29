require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar tipos de logradouro" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de Logradouro")

    click_link "Criar Tipo de Logradouro"

    fill_in "logradouro_tipo_descricao",                    with: "CALLE"
    fill_in "logradouro_tipo_descricao_abreviada",          with: "ARR"
    fill_in "logradouro_tipo_descricao_abreviada_completa", with: "MILLA"
    uncheck "logradouro_tipo_ativo"

    click_button "Salvar Tipo de Logradouro"

    expect(page).to have_content "Tipo de logradouro criado com sucesso"

    fill_in "logradouro_tipo_descricao",                    with: "cal"
    fill_in "logradouro_tipo_descricao_abreviada",          with: "ar"
    fill_in "logradouro_tipo_descricao_abreviada_completa", with: "mi"

    click_button "Pesquisar"

    within ".logradouro_tipo" do
      expect(page).to have_content "CALLE"
      expect(page).to have_content "ARR"
      expect(page).to have_content "MILLA"
      expect(page).to have_css ".logradouro_tipo_ativo", text: "inativo"
    end
  end
end
