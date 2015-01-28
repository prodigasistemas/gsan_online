require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar tipos de ceps" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de CEP")

    click_link "Criar Tipo de CEP"

    fill_in "cep_tipo_descricao", with: "UM TIPO QUALQUER"
    check "cep_tipo_ativo"

    click_button "Salvar Tipo de CEP"

    expect(page).to have_content "Tipo de CEP criado com sucesso"

    fill_in "cep_tipo_descricao", with: "TIPO"
    click_button "Pesquisar"

    within ".cep_tipo" do
      expect(page).to have_content "UM TIPO QUALQUER"
      expect(page).to have_css ".cep_tipo_ativo", text: "Sim"
    end
  end
end