require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso listar bairros" do
    visit root_path

    click_link "Bairros"
    fill_in "bairro_nome", with: "UMARIZAL"
    click_button "Pesquisar"

    expect(page).to have_content "UMARIZAL"
  end
end