require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar municípios" do
    visit root_path

    click_link "Municípios"
    click_link "Criar Município"

    fill_in "municipio_codigo_ibge", with: "22"
    fill_in "municipio_nome",        with: "CAMETA"
    fill_in "municipio_ddd",         with: "91"
    fill_in "municipio_cep_inicial", with: "66050380"
    fill_in "municipio_cep_final",   with: "66050400"
    select "PA - PARA",              from: "municipio_uf_id"
    select "BELEM",                  from: "municipio_micro_regiao_id"
    select "MARAJO",                 from: "municipio_regiao_desenvolvimento_id"
    check "municipio_ativo"

    click_button "Salvar Município"

    expect(page).to have_content "Município criado com sucesso"

    fill_in "municipio_codigo_ibge", with: "22"
    fill_in "municipio_nome",        with: "cam"
    fill_in "municipio_ddd",         with: "91"
    fill_in "municipio_cep_inicial", with: "66050380"
    fill_in "municipio_cep_final",   with: "66050400"
    select "PA - PARA",              from: "municipio_uf_id"
    select "BELEM",                  from: "municipio_micro_regiao_id"
    select "MARAJO",                 from: "municipio_regiao_desenvolvimento_id"
    click_button "Pesquisar"

    expect(page).to have_content "22"
    expect(page).to have_content "CAMETA"
    expect(page).to have_content "BELEM"
    expect(page).to have_content "91"
    expect(page).to have_content "66050380"
    expect(page).to have_content "66050400"
    expect(page).to have_content "MARAJO"
    expect(page).to have_content "PA"
    expect(page).to have_css ".municipio_ativo", text: "Sim"
  end
end
