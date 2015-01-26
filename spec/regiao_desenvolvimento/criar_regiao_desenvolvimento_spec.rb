require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar regiões de desenvolvimento" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Regiões de Desenvolvimento")

    click_link "Criar Região de Desenvolvimento"

    fill_in "regiao_desenvolvimento_nome", with: "BAIXO AMAZONAS"
    check "regiao_desenvolvimento_ativo"

    click_button "Salvar Região de Desenvolvimento"

    expect(page).to have_content "Região de Desenvolvimento criada com sucesso"

    fill_in "regiao_desenvolvimento_nome", with: "BAIXO AMAZONAS"
    click_button "Pesquisar"
    
    expect(page).to have_content "BAIXO AMAZONAS"
  end
end