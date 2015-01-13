require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar um CEP" do
    visit root_path

    click_link "CEPs"
    find('tr.cep:last-child').click_link("Editar")

    cadastrar_cep

    expect(page).to have_content "CEP atualizado com sucesso"

    expect(page).to have_content "66050380"
    expect(page).to have_content "ÚNICO"
    expect(page).to have_content "BELÉM"
    expect(page).to have_content "UMARIZAL"
    expect(page).to have_content "RUA"
    expect(page).to have_content "OLIVEIRA-BELO"
  end
end
