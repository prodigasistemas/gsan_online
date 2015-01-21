require "rails_helper"

describe "Como cadastrista", type: :feature, js: true do
  it "eu posso cadastrar um cliente Pessoa Física" do
    visit root_path

    click_link "Clientes"
    click_link "Criar Cliente"
    click_link "Pessoa Física"

    expect(page).to_not have_css "#pessoa_juridica"
    expect(page).to_not have_css "#cliente_tipo_id option", text: "ASSOCIACOES"

    select "RESIDENCIAL", from: "cliente_tipo_id"
    fill_in "cliente_nome", with: "ORLANDO MESQUITA"
    fill_in "cliente_nome_abreviado", with: "O MESQUITA"
    fill_in "cliente_email", with: "orlando_mesquita@mail.com"
    within "#cliente_gera_fatura_antecipada" do
      click_link "Sim"
    end
    within "#cliente_permite_negativacao" do
      click_link "Sim"
    end

    fill_in "cliente_cpf", with: "94239288168"
    fill_in "cliente_rg", with: "41238216"
    fill_in "cliente_data_emissao_rg", with: "10/01/1988"
    select "CREA", from: "cliente_orgao_emissor_rg_id"
    select "PARA | PA", from: "cliente_orgao_emissor_uf_id"

    fill_in "cliente_nascimento", with: "10/01/1988"
    select_from_autocomplete("pro", "PROGRAMADOR", "cliente_profissao")
    select "MASCULINO", from: "cliente_pessoa_sexo_id"
    fill_in "cliente_nome_mae", with: "Rosa Cristina Bastos"

    click_button "Salvar Cliente"

    expect(page).to have_content "Cliente criado com sucesso"

    validar
  end

  def validar
    fill_in "cliente_nome", with: "orlando"
    fill_in "cliente_cpf", with: "94239288168"

    click_button "Pesquisar"

    expect(page).to have_content "ORLANDO MESQUITA"
    expect(page).to have_content "94239288168"
    expect(page).to have_css ".cliente_ativo", text: "Sim"
  end
end
