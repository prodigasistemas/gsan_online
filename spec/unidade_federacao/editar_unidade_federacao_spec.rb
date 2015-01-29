require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso atualizar Unidades da Federação" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Unidades da Federação")

    fill_in "unidade_federacao_sigla", with: "AM"
    click_button "Pesquisar"

    find(".unidade_federacao:last-child a").click

    fill_in "unidade_federacao_descricao", with: "unidade zz"
    fill_in "unidade_federacao_sigla", with: "ZZ"

    click_button "Salvar Unidade da Federação"

    expect(page).to have_content "Unidade da Federação atualizada com sucesso"

    fill_in "unidade_federacao_sigla", with: "ZZ"
    click_button "Pesquisar"

    within ".unidade_federacao" do
      expect(page).to have_content "unidade zz"
      expect(page).to have_content "ZZ"
    end
  end
end
