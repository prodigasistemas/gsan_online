require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar enderecos de referencia" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Endereços de Referência")

    click_link "Criar Endereço de Referência"

    fill_in "endereco_referencia_descricao",           with: "MARTE"
    fill_in "endereco_referencia_descricao_abreviada", with: "MARTE ABR"
    uncheck "endereco_referencia_ativo"

    click_button "Salvar Endereço de Referência"

    expect(page).to have_content "Endereço de referência criado com sucesso"

    fill_in "endereco_referencia_descricao",           with: "mar"
    fill_in "endereco_referencia_descricao_abreviada", with: "abr"

    click_button "Pesquisar"

    within ".endereco_referencia" do
      expect(page).to have_content "MARTE"
      expect(page).to have_content "MARTE ABR"
      expect(page).to have_css ".endereco_referencia_ativo", text: "inativo"
    end
  end
end
