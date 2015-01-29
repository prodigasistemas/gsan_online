require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar orgao expedidor de RG" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Órgãos Expedidores de RG")

    fill_in "orgao_expedidor_rg_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".orgao_expedidor_rg:last-child a").click

    fill_in "orgao_expedidor_rg_descricao",           with: "AMERICAN RG"
    fill_in "orgao_expedidor_rg_descricao_abreviada", with: "YANK"
    uncheck "orgao_expedidor_rg_ativo"

    click_button "Salvar Órgão Expedidor de RG"

    expect(page).to have_content "Órgão expedidor de RG atualizado com sucesso"

    fill_in "orgao_expedidor_rg_descricao",           with: "amer"
    fill_in "orgao_expedidor_rg_descricao_abreviada", with: "yan"

    click_button "Pesquisar"

    within ".orgao_expedidor_rg" do
      expect(page).to have_content "AMERICAN RG"
      expect(page).to have_content "YANK"
      expect(page).to have_css ".orgao_expedidor_rg_ativo", text: "ativo"
    end
  end
end
