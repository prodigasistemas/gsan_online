require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar ramos de atividade" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Ramos de Atividade")

    click_link "Criar Ramo de Atividade"

    fill_in "ramo_atividade_descricao", with: "PETROLEO"
    fill_in "ramo_atividade_codigo",    with: "122"
    uncheck "ramo_atividade_ativo"

    click_button "Salvar Ramo de Atividade"

    expect(page).to have_content "Ramo de atividade criado com sucesso"

    fill_in "ramo_atividade_descricao", with: "petr"
    fill_in "ramo_atividade_codigo",    with: "122"

    click_button "Pesquisar"

    within ".ramo_atividade" do
      expect(page).to have_content "PETROLEO"
      expect(page).to have_content "122"
      expect(page).to have_css ".ramo_atividade_ativo", text: "inativo"
    end
  end
end
