require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar tipos de clientes" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de Clientes")

    click_link "Criar Tipo de Cliente"

    fill_in "cliente_tipo_descricao", with: "ANARQUIA"
    select "MUNICIPAL", from: "cliente_tipo_esfera_poder_id"
    select "PESSOA FISICA", from: "cliente_tipo_pessoa_tipo"
    check "cliente_tipo_ativo"

    click_button "Salvar Tipo de Cliente"

    expect(page).to have_content "Tipo de cliente criado com sucesso"

    fill_in "cliente_tipo_descricao", with: "ANARQUIA"
    select "MUNICIPAL", from: "cliente_tipo_esfera_poder_id"
    select "PESSOA FISICA", from: "cliente_tipo_pessoa_tipo"

    click_button "Pesquisar"

    within ".cliente_tipo" do
        expect(page).to have_content "ANARQUIA"
        expect(page).to have_content "PESSOA FISICA"
        expect(page).to have_content "MUNICIPAL"
        expect(page).to have_css ".cliente_tipo_ativo", text: "Sim"
    end
  end
end
