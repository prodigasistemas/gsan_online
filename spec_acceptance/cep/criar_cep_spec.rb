require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso cadastrar CEPs" do
    visit root_path

    click_link "CEPs"
    click_link "Criar CEP"

    fill_in "cep_codigo",           with: "66050380"
    select "ÚNICO",                 from: "cep_tipo_id"
    select "BELÉM",                 from: "cep_municipio_id"
    select "UMARIZAL",              from: "cep_bairro"
    select "RUA",                   from: "cep_tipo_logradouro"
    fill_in "cep_logradouro",       with: "OLIVEIRA-BELO"

    click_button "Salvar CEP"

    expect(page).to have_content "CEP criado com sucesso"
  end
end