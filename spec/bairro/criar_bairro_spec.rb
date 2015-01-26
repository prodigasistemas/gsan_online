require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  before do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Bairros")

    click_link "Criar Bairro"
  end

  it "eu posso cadastrar um bairro" do
    select_from_autocomplete("bel", "BELEM | PARA", "municipios")
    fill_in "bairro_codigo",             with: "1010"
    fill_in "bairro_nome",               with: "JURUNAS"
    fill_in "bairro_codigo_prefeitura",  with: "212"
    check "bairro_ativo"

    testar_areas

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro criado com sucesso"

    validar
  end

  def validar
    select_from_autocomplete("bel", "BELEM | PARA", "bairro_municipio_id")
    fill_in "bairro_codigo",            with: "1010"
    fill_in "bairro_nome",              with: "JURUNAS"
    fill_in "bairro_codigo_prefeitura", with: "212"
    click_button "Pesquisar"

    expect(page).to have_content "BELEM"
    expect(page).to have_content "1010"
    expect(page).to have_content "JURUNAS"
    expect(page).to have_content "212"
    expect(page).to have_css ".bairro_ativo", text: "Sim"
  end

  def testar_areas
    fill_in "bairro_area_nome",              with: "NOVA AREA"
    select "DISTRITO GERAL", from: "distrito_operacionais"
    click_button "Adicionar"
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 1
    
    fill_in "bairro_area_nome",              with: "MAIS UMA AREA"
    select "DISTRITO 1", from: "distrito_operacionais"
    click_button "Adicionar"
    expect(page).to have_css ".bairro_area", text: "MAIS UMA AREA", count: 1

    fill_in "bairro_area_nome",              with: "NOVA AREA"
    select "DISTRITO 1", from: "distrito_operacionais"
    click_button "Adicionar"
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 1
    expect(page).to have_content "Área já adicionada"

    within ".bairro_area:first-child" do
      click_link "X"
    end
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 0

    within ".bairro_area:first-child" do
      click_link "X"
    end
    expect(page).to have_css ".bairro_area", text: "MAIS UMA AREA", count: 0
  end
end
