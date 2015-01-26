require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar micro regiões" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Micro Regiões")
    
    fill_in "micro_regiao_nome", with: "BELEM"
    click_button "Pesquisar"
    find(".micro_regiao:last-child a").click

    fill_in "micro_regiao_nome", with: "TAPAJOS"
    select "NORDESTE", from: "micro_regiao_regiao_id"
    check "micro_regiao_ativo"

    click_button "Salvar Micro Região"

    expect(page).to have_content "Micro Região atualizada com sucesso"

    fill_in "micro_regiao_nome", with: "TAPAJOS"
    
    expect(page).to have_content "NORDESTE"
  end
end