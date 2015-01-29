require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar Unidades da Federação" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Unidades da Federação")

    click_link "Criar Unidade da Federação"

    fill_in "unidade_federacao_descricao", with: "unidade yy"
    fill_in "unidade_federacao_sigla", with: "YY"

    click_button "Salvar Unidade da Federação"

    expect(page).to have_content "Unidade da Federação criada com sucesso"

    fill_in "unidade_federacao_descricao", with: "Y"
    click_button "Pesquisar"

    within ".unidade_federacao" do
      expect(page).to have_content "unidade yy"
      expect(page).to have_content "YY"
    end
  end
end
