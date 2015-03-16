require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar micro regiões" do
    visit root_path
    
    click_modulo("Cadastro")
    click_sub_modulo("Micro Regiões")

    click_link "Criar Micro Região"

    fill_in "micro_regiao_nome", with: "SALINAS"
    select "NORDESTE", from: "micro_regiao_regiao_id"
    check "micro_regiao_ativo"

    click_button "Salvar Micro Região"

    expect(page).to have_content "Micro Região criada com sucesso"

    fill_in "micro_regiao_nome", with: "SALINAS"
    click_button "Pesquisar"
    
    expect(page).to have_content "NORDESTE"
  end
end