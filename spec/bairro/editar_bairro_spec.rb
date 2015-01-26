require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar um bairro" do
    visit root_path

    find("h1", :text => "Cadastro").click
    find("h5", :text => "Bairros").click

    fill_in "bairro_codigo", with: "999"
    click_button "Pesquisar"

    find(".bairro:last-child a").click

    fill_in "bairro_codigo",            with: "12345"
    fill_in "bairro_nome",              with: "CREMACAO"
    fill_in "bairro_codigo_prefeitura", with: "121"
    uncheck "bairro_ativo"

    testar_areas

    click_button "Salvar Bairro"

    expect(page).to have_content "Bairro editado com sucesso"

    validar
  end

  def validar
    select_from_autocomplete("bel", "BELEM | PARA", "bairro_municipio_id")
    fill_in "bairro_codigo",            with: "12345"
    fill_in "bairro_nome",              with: "CREMACAO"
    fill_in "bairro_codigo_prefeitura", with: "121"
    click_button "Pesquisar"

    expect(page).to have_content "BELEM"
    expect(page).to have_content "12345"
    expect(page).to have_content "CREMACAO"
    expect(page).to have_content "121"
    expect(page).to have_css ".bairro_ativo", text: ""
  end

  def testar_areas
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 1

    fill_in "bairro_area_nome",              with: "OUTRA AREA"
    select "DISTRITO GERAL", from: "distrito_operacionais"
    click_button "Adicionar"
    expect(page).to have_css ".bairro_area", text: "OUTRA AREA", count: 1

    fill_in "bairro_area_nome",              with: "NOVA AREA"
    select "DISTRITO 1", from: "distrito_operacionais"
    click_button "Adicionar"
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 1
    expect(page).to have_content "Área já adicionada"

    within ".bairro_area[data-bairro-area-nome='OUTRA AREA']" do
      click_link "X"
    end
    expect(page).to have_css ".bairro_area", text: "OUTRA AREA", count: 0

    within ".bairro_area[data-bairro-area-nome='NOVA AREA']" do
      click_link "X"
      click_link "Cancelar"
      click_link "X"
    end
    expect(page).to have_css ".bairro_area", text: "NOVA AREA", count: 1
  end
end
