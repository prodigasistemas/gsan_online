require 'rails_helper'

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar profissões" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Profissões")

    click_link "Criar Profissão"

    fill_in "profissao_descricao", with: "CRIADOR DE SOFTWARE"
    fill_in "profissao_codigo",    with: "123456"
    uncheck "profissao_ativo"

    click_button "Salvar Profissão"

    expect(page).to have_content "Profissão criada com sucesso"

    fill_in "profissao_descricao", with: "criad"
    fill_in "profissao_codigo",    with: "123456"

    click_button "Pesquisar"

    within ".profissao" do
        expect(page).to have_content "CRIADOR DE SOFTWARE"
        expect(page).to have_content "123456"
        expect(page).to have_css ".profissao_ativo", text: "inativo"
    end
  end
end
