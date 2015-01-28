require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar esferas de poder" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Esferas de Poder")

    click_link "Criar Esfera de Poder"

    fill_in "esfera_poder_descricao", with: "EXTRANGEIRO"
    within "#esfera_poder_permite_gerar_certidao_negativa_imovel" do
      click_link "Sim"
    end
    within "#esfera_poder_permite_gerar_certidao_negativa_cliente" do
      click_link "Sim"
    end

    uncheck "esfera_poder_ativo"

    click_button "Salvar Esfera de Poder"

    expect(page).to have_content "Esfera de poder criada com sucesso"

    fill_in "esfera_poder_descricao", with: "extr"
    select "SIM", from: "esfera_poder_permite_gerar_certidao_negativa_imovel"
    select "SIM", from: "esfera_poder_permite_gerar_certidao_negativa_cliente"

    click_button "Pesquisar"

    within ".esfera_poder" do
        expect(page).to have_content "EXTRANGEIRO"
        expect(page).to have_css ".esfera_poder_permite_gerar_certidao_negativa_imovel", text: "Sim"
        expect(page).to have_css ".esfera_poder_permite_gerar_certidao_negativa_cliente", text: "Sim"
        expect(page).to have_css ".esfera_poder_ativo", text: "inativo"
    end
  end
end
