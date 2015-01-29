require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar orgao expedidor de RG" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Órgãos Expedidores de RG")

    click_link "Criar Órgão Expedidor de RG"

    fill_in "orgao_expedidor_rg_descricao",           with: "JAPAN RG"
    fill_in "orgao_expedidor_rg_descricao_abreviada", with: "NIPPO"
    uncheck "orgao_expedidor_rg_ativo"

    click_button "Salvar Órgão Expedidor de RG"

    expect(page).to have_content "Órgão expedidor de RG criado com sucesso"

    fill_in "orgao_expedidor_rg_descricao",           with: "jap"
    fill_in "orgao_expedidor_rg_descricao_abreviada", with: "nip"

    click_button "Pesquisar"

    within ".orgao_expedidor_rg" do
      expect(page).to have_content "JAPAN RG"
      expect(page).to have_content "NIPPO"
      expect(page).to have_css ".orgao_expedidor_rg_ativo", text: "ativo"
    end
  end
end
