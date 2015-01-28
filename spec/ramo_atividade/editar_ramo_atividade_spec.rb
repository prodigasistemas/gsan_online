require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar ramos de atividade" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Ramos de Atividade")

    fill_in "ramo_atividade_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".ramo_atividade:last-child a").click

    fill_in "ramo_atividade_descricao", with: "MINERIO DE FERRO"
    fill_in "ramo_atividade_codigo",    with: "1223"
    check "ramo_atividade_ativo"

    click_button "Salvar Ramo de Atividade"

    expect(page).to have_content "Ramo de atividade atualizado com sucesso"

    fill_in "ramo_atividade_descricao", with: "minerio"
    fill_in "ramo_atividade_codigo",    with: "1223"

    click_button "Pesquisar"

    within ".ramo_atividade" do
      expect(page).to have_content "MINERIO DE FERRO"
      expect(page).to have_content "1223"
      expect(page).to have_css ".ramo_atividade_ativo", text: "ativo"
    end
  end
end
