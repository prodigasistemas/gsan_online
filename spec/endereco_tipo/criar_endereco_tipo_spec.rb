require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar tipos de endereco" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de Endereço")

    click_link "Criar Tipo de Endereço"

    fill_in "endereco_tipo_descricao", with: "UNIVERSAL"
    uncheck "endereco_tipo_ativo"

    click_button "Salvar Tipo de Endereço"

    expect(page).to have_content "Tipo de endereço criado com sucesso"

    fill_in "endereco_tipo_descricao", with: "univ"

    click_button "Pesquisar"

    within ".endereco_tipo" do
      expect(page).to have_content "UNIVERSAL"
      expect(page).to have_css ".endereco_tipo_ativo", text: "inativo"
    end
  end
end
