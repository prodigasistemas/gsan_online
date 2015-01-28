require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar municípios" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Municípios")

    fill_in "municipio_codigo_ibge", with: "123456"
    click_button "Pesquisar"
    find(".municipio:last-child a").click

    fill_in "municipio_codigo_ibge", with: "221"
    fill_in "municipio_nome",        with: "MOJU"
    fill_in "municipio_ddd",         with: "919"
    fill_in "municipio_cep_inicial", with: "66050000"
    fill_in "municipio_cep_final",   with: "66050999"
    select "AC - ACRE",              from: "municipio_uf_id"
    select "OBIDOS",                 from: "municipio_micro_regiao_id"
    select "METROPOLITANA",          from: "municipio_regiao_desenvolvimento_id"
    uncheck "municipio_ativo"

    click_button "Salvar Município"

    expect(page).to have_content "Município editado com sucesso"

    fill_in "municipio_codigo_ibge", with: "221"
    fill_in "municipio_nome",        with: "moj"
    fill_in "municipio_ddd",         with: "919"
    fill_in "municipio_cep_inicial", with: "66050000"
    fill_in "municipio_cep_final",   with: "66050999"
    select "AC - ACRE",              from: "municipio_uf_id"
    select "OBIDOS",                 from: "municipio_micro_regiao_id"
    select "METROPOLITANA",          from: "municipio_regiao_desenvolvimento_id"
    click_button "Pesquisar"

    expect(page).to have_content "221"
    expect(page).to have_content "MOJU"
    expect(page).to have_content "919"
    expect(page).to have_content "66050000"
    expect(page).to have_content "66050999"
    expect(page).to have_content "OBIDOS"
    expect(page).to have_content "METROPOLITANA"
    expect(page).to have_content "AC"
    expect(page).to have_css ".municipio_ativo", text: "inativo"
  end
end
