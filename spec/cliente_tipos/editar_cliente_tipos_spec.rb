require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar tipos de clientes" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Tipos de Clientes")

    fill_in "cliente_tipo_descricao", with: "MINISTERIO"
    click_button "Pesquisar"

    find(".cliente_tipo:last-child a").click

    fill_in "cliente_tipo_descricao", with: "MINISTERIO FEDERAL"
    select "FEDERAL", from: "cliente_tipo_esfera_poder_id"
    select "PESSOA FISICA", from: "cliente_tipo_pessoa_tipo"
    uncheck "cliente_tipo_ativo"

    click_button "Salvar Tipo de Cliente"

    expect(page).to have_content "Tipo de cliente atualizado com sucesso"

    fill_in "cliente_tipo_descricao", with: "MINISTERIO FEDERAL"
    select "FEDERAL", from: "cliente_tipo_esfera_poder_id"
    select "PESSOA FISICA", from: "cliente_tipo_pessoa_tipo"

    click_button "Pesquisar"

    within ".cliente_tipo" do
        expect(page).to have_content "MINISTERIO FEDERAL"
        expect(page).to have_content "PESSOA FISICA"
        expect(page).to have_content "FEDERAL"
        expect(page).to have_css ".cliente_tipo_ativo", text: "inativo"
    end
  end
end


