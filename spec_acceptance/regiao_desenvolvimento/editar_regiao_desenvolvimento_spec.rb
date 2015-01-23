require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar regiões de desenvolvimento" do
    visit root_path

    click_link "Regiões de Desenvolvimento"
    fill_in "regiao_desenvolvimento_nome", with: "METROPOLITANA"
    click_button "Pesquisar"
    find(".regiao_desenvolvimento:last-child a").click

    fill_in "regiao_desenvolvimento_nome", with: "NORDESTE PARAENSE"
    check "regiao_desenvolvimento_ativo"

    click_button "Salvar Região de Desenvolvimento"

    expect(page).to have_content "Região de Desenvolvimento atualizada com sucesso"

    fill_in "regiao_desenvolvimento_nome", with: "NORDESTE PARAENSE"
    click_button "Pesquisar"
    
    expect(page).to have_content "NORDESTE PARAENSE"
  end
end