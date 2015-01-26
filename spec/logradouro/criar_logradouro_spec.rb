require "rails_helper"

describe "Como cadastrista", type: :feature, js: true do
  it "eu posso cadastrar um logradouro" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo(/^Logradouros$/)

    click_link "Criar Logradouro"

    select "RUA", from: "logradouro_tipo_id"
    select "GOV", from: "titulo_logradouro_id"
    fill_in "logradouro_nome",          with: "JOSE MALCHER"
    fill_in "logradouro_nome_popular",  with: "SAO GERONIMO"
    select_from_autocomplete("bel", "BELEM | PARA", "municipios")

    check "logradouro_ativo"

    testar_bairros
    testar_ceps

    select "PEDREIRA", from: "bairros"
    select "UMARIZAL", from: "bairros"

    within "#pesquisa_cep" do
      fill_in "codigo_cep", with: "66050380"
      click_button "Adicionar"
    end
    expect(page).to have_css "#cep_66050380", count: 1

    click_button "Salvar Logradouro"
    expect(page).to have_content "Logradouro criado com sucesso"

    validar
  end

  def validar
    fill_in "logradouro_nome", with: "jose"
    select_from_autocomplete("bel", "BELEM | PA", "bairro_municipio_id")

    click_button "Pesquisar"

    expect(page).to have_content "JOSE MALCHER"
    expect(page).to have_content "BELEM"
    expect(page).to have_css ".logradouro_ativo", text: "Sim"

    find(".logradouro:last-child a").click

    expect(page).to have_css ".bairro", text: "PEDREIRA", count: 1
    expect(page).to have_css ".bairro", text: "UMARIZAL", count: 1
    expect(page).to have_css "#cep_66050380", count: 1
  end

  def testar_ceps
    within "#pesquisa_cep" do
      fill_in "codigo_cep", with: "12341234"
      click_button "Adicionar"
      expect(page).to have_content "CEP não encontrado"
    end
    expect(page).to have_css "#cep_12341234", count:  0

    within "#pesquisa_cep" do
      fill_in "codigo_cep", with: "66050380"
      click_button "Adicionar"
    end
    expect(page).to have_css "#cep_66050380", count: 1

    within "#pesquisa_cep" do
      fill_in "codigo_cep", with: "66050380"
      click_button "Adicionar"
      expect(page).to have_content "CEP já selecionado"
    end
    expect(page).to have_css "#cep_66050380", count: 1

    within "#cep_66050380" do
      click_link "X"
    end
    expect(page).to have_css "#cep_66050380", count: 0
  end

  def testar_bairros
    select "UMARIZAL", from: "bairros"
    expect(page).to have_css ".bairro", text: "UMARIZAL", count: 1
    select "PEDREIRA", from: "bairros"
    expect(page).to have_css ".bairro", text: "PEDREIRA", count: 1
    select "UMARIZAL", from: "bairros"
    expect(page).to have_css ".bairro", text: "UMARIZAL", count: 1
    expect(page).to have_content "Bairro já selecionado"

    within ".bairro:first-child" do
      click_link "X"
    end
    expect(page).to have_css ".bairro", text: "UMARIZAL", count: 0

    within ".bairro:first-child" do
      click_link "X"
    end
    expect(page).to have_css ".bairro", text: "PEDREIRA", count: 0
  end
end
