require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar regiões" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo(/^Regiões$/)

    click_link "Criar Região"

    fill_in "regiao_nome", with: "NORTE"
    check "regiao_ativo"

    click_button "Salvar Região"

    expect(page).to have_content "Região criada com sucesso"

    fill_in "regiao_nome", with: "NORTE"
    
    click_button "Pesquisar"
    
    expect(page).to have_content "NORTE"
  end
end