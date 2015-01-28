require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar tipos de cep" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de CEP")

    fill_in "cep_tipo_descricao", with: "BECO"
    click_button "Pesquisar"

    find(".cep_tipo:last-child a").click

    fill_in "cep_tipo_descricao", with: "OUTRO TIPO DE CEP"
    uncheck "cep_tipo_ativo"

    click_button "Salvar Tipo de CEP"

    expect(page).to have_content "Tipo de CEP atualizado com sucesso"

    fill_in "cep_tipo_descricao", with: "OUTRO"
    click_button "Pesquisar"

    within ".cep_tipo" do
      expect(page).to have_content "OUTRO TIPO DE CEP"
      expect(page).to have_css ".cep_tipo_ativo", text: "inativo"
    end
  end
end


