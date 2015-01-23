require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar regiões" do
    visit root_path

    click_link "Regiões"
    fill_in "regiao_nome", with: "NORDESTE"
    click_button "Pesquisar"
    find(".regiao:last-child a").click

    fill_in "regiao_nome", with: "MINHA REGIAO"
    check "regiao_ativo"

    click_button "Salvar Região"

    expect(page).to have_content "Região atualizada com sucesso"

    fill_in "regiao_nome", with: "MINHA"

    click_button "Pesquisar"
    
    expect(page).to have_content "MINHA REGIAO"
  end
end