require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar profissões" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Profissões")

    fill_in "profissao_descricao", with: "Me edite"
    click_button "Pesquisar"
    find(".profissao:last-child a").click

    fill_in "profissao_descricao", with: "DESTRUIDOR DE SOFTWARE"
    fill_in "profissao_codigo",    with: "1234567"
    check "profissao_ativo"

    click_button "Salvar Profissão"

    expect(page).to have_content "Profissão atualizada com sucesso"

    fill_in "profissao_descricao", with: "destru"
    fill_in "profissao_codigo",    with: "1234567"

    click_button "Pesquisar"

    within ".profissao" do
        expect(page).to have_content "DESTRUIDOR DE SOFTWARE"
        expect(page).to have_content "1234567"
        expect(page).to have_css ".profissao_ativo", text: "ativo"
    end
  end
end
