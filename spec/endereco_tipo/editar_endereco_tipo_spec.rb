require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar tipos de endereco" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de Endereço")

    fill_in "endereco_tipo_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".endereco_tipo:last-child a").click

    fill_in "endereco_tipo_descricao", with: "LUNAR"
    check "endereco_tipo_ativo"

    click_button "Salvar Tipo de Endereço"

    expect(page).to have_content "Tipo de endereço atualizado com sucesso"

    fill_in "endereco_tipo_descricao", with: "luna"

    click_button "Pesquisar"

    within ".endereco_tipo" do
      expect(page).to have_content "LUNAR"
      expect(page).to have_css ".endereco_tipo_ativo", text: "ativo"
    end
  end
end
