require "rails_helper"

describe "Como cadastrista", type: :feature, js: true do
  it "eu posso cadastrar um logradouro" do
    visit root_path

    click_link "Logradouros"
    click_link "Criar Logradouro"

    select "RUA", from: "tipo_logradouro"
    select "GOV", from: "titulo_logradouro"

    fill_in "nome_logradouro", with: "JOSE MALCHER"
    fill_in "nome_popular_logradouro", with: "SAO GERONIMO"
    select_from_autocomplete("bel", "BELEM | PARA", "municipios")
    select "UMARIZAL", from: "bairros"
  end
end