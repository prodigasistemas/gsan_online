require "rails_helper"

describe "Como um cadastrista", type: :feature, js: true do
  it "eu posso editar um CEP" do
    visit root_path

    click_link "CEPs"
    fill_in "cep_codigo", with: "66050380"
    click_button "Pesquisar"
    find('tr.cep:last-child').click_link("Editar")

    fill_in "cep_codigo",           with: "66050383"
    select "ÚNICO",                 from: "cep_tipo_id"
    select_from_autocomplete("bel", "BELEM | PARA", "cep_municipio_id")
    select "UMARIZAL",              from: "cep_bairro"
    select "RUA",                   from: "cep_tipo_logradouro"
    fill_in "cep_logradouro",       with: "OLIVEIRA-BELO"
    check "cep_ativo"

    click_button "Salvar CEP"

    expect(page).to have_content "CEP atualizado com sucesso"

    fill_in "cep_codigo",           with: "66050383"
    fill_in "cep_municipio",        with: "bel"
    fill_in "cep_bairro",           with: "umar"
    fill_in "cep_logradouro",       with: "oliv"
    select "RUA",                   from: "cep_tipo_logradouro"
    select "ÚNICO",                 from: "cep_tipo_id"
    select "PA",                    from: "cep_uf"
    click_button "Pesquisar"

    expect(page).to have_content "66050383"
    expect(page).to have_content "ÚNICO"
    expect(page).to have_content "BELEM"
    expect(page).to have_content "UMARIZAL"
    expect(page).to have_content "RUA"
    expect(page).to have_content "OLIVEIRA-BELO"
  end
end
