require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar ramos de atividade" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Endereços de Referência")

    fill_in "endereco_referencia_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".endereco_referencia:last-child a").click

    fill_in "endereco_referencia_descricao",           with: "ESQUINA"
    fill_in "endereco_referencia_descricao_abreviada", with: "ESQUINA ABR"
    uncheck "endereco_referencia_ativo"

    click_button "Salvar Endereço de Referência"

    expect(page).to have_content "Endereço de referência atualizado com sucesso"

    fill_in "endereco_referencia_descricao",           with: "esq"
    fill_in "endereco_referencia_descricao_abreviada", with: "abr"

    click_button "Pesquisar"

    within ".endereco_referencia" do
      expect(page).to have_content "ESQUINA"
      expect(page).to have_content "ESQUINA ABR"
      expect(page).to have_css ".endereco_referencia_ativo", text: "ativo"
    end
  end
end
