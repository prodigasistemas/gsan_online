require "rails_helper"

describe "Como cadastrista", type: :feature, js: true do
  it "eu posso cadastrar um cliente Pessoa Jurídica" do
    visit root_path

    click_modulo("Cadastro")
    click_sub_modulo("Clientes")

    click_link "Criar Cliente"
    click_link "Pessoa Jurídica"

    expect(page).to_not have_css "#pessoa_fisica"
    expect(page).to_not have_css "#cliente_tipo_id option", text: "RESIDENCIAL"

    select "ASSOCIACOES", from: "cliente_tipo_id"
    fill_in "cliente_nome", with: "MARCOS MARCELINO"
    fill_in "cliente_nome_abreviado", with: "M MARCELINO"
    fill_in "cliente_email", with: "m_marcelino@mail.com"
    within "#cliente_gera_fatura_antecipada" do
      click_link "Sim"
    end
    within "#cliente_permite_negativacao" do
      click_link "Sim"
    end

    fill_in "cliente_cnpj", with: "28112406000185"
    select_from_autocomplete("acoug", "ACOUGUE", "cliente_ramo_atividade")

    seleciona_responsavel_superior
    adicionaTelefones

    click_button "Salvar Cliente"

    expect(page).to have_content "Cliente criado com sucesso"

    validar
  end

  def validar
    fill_in "cliente_nome", with: "marcos"
    fill_in "cliente_cnpj", with: "28112406000185"

    click_button "Pesquisar"

    find(".cliente:last-child a").click

    expect(page).to have_css "#cliente_tipo_id option[selected]", text: "ASSOCIACOES"
    expect(find_field('cliente_nome').value).to eql "MARCOS MARCELINO"
    expect(find_field('cliente_nome_abreviado').value).to eql "M MARCELINO"
    expect(find_field('cliente_email').value).to eql "m_marcelino@mail.com"
    expect(page).to have_css "#cliente_vencimento_mes_seguinte .active", text: "Não"
    expect(page).to have_css "#cliente_gera_fatura_antecipada .active",  text: "Sim"
    expect(page).to have_css "#cliente_permite_negativacao .active",     text: "Sim"

    expect(find_field('cliente_cnpj').value).to eql "28112406000185"
    expect(page).to have_css "#cliente_ramo_atividade button", text: "ACOUGUE"
    expect(page).to have_css "#cliente_responsavel_superior_selecionado", text: "LABORATORIO ALFAZEMA"

    valida_telefone_presente!(ddd: 91, numero: 89917171, tipo: "COMERCIAL", ramal: "123", nome_contato: "TELEFONISTA", padrao: true)
  end

  def seleciona_responsavel_superior
    click_link "Selecionar cliente responsável superior"
    click_link "Cancelar"
    click_link "Selecionar cliente responsável superior"

    fill_in "cliente_responsavel_superior_cnpj", with: "37217098000143"
    fill_in "cliente_responsavel_superior_nome", with: "LABOR"
    select "MUNICIPAL", from: "cliente_responsavel_superior_esfera_poder_id"
    click_link "Pesquisar responsável superior"
    click_link "Selecionar"
    expect(page).to have_css "span#responsavel_superior_selecionado", text: "LABORATORIO ALFAZEMA"

    find(".apagar_responsavel_superior").click
    click_link "Selecionar cliente responsável superior"

    fill_in "cliente_responsavel_superior_cnpj", with: "37217098000143"
    fill_in "cliente_responsavel_superior_nome", with: "LABOR"
    select "MUNICIPAL", from: "cliente_responsavel_superior_esfera_poder_id"
    click_link "Pesquisar responsável superior"
    click_link "Selecionar"
    expect(page).to have_css "span#responsavel_superior_selecionado", text: "LABORATORIO ALFAZEMA"
  end

  def adicionaTelefones
    click_link "Adicionar novo telefone"
    click_link "Cancelar"

    adicionar_telefone ddd: 91, numero: 89917171, tipo: "COMERCIAL", ramal: "123", nome_contato: "TELEFONISTA", padrao: true

    within "#telefone_91_89917171" do
     find(".remove").click
    end
    expect(page).to have_no_css "#telefone_91_89917171"

    adicionar_telefone ddd: 91, numero: 89917171, tipo: "COMERCIAL", ramal: "123", nome_contato: "TELEFONISTA", padrao: true
  end

  def adicionar_telefone(ddd: nil, numero: nil, tipo: nil, ramal: nil, nome_contato: nil, padrao: nil)
    click_link "Adicionar novo telefone"

    select tipo, from: "cliente_telefone_tipo"
    fill_in "cliente_telefone_ddd", with: ddd
    fill_in "cliente_telefone_numero", with: numero
    fill_in "cliente_telefone_ramal", with: ramal
    fill_in "cliente_telefone_nome_contato", with: nome_contato
    click_link "Adicionar telefone"
    valida_telefone_presente! ddd: ddd, numero: numero, tipo: tipo, ramal: ramal, nome_contato: nome_contato, padrao: padrao
  end

  def valida_telefone_presente!(ddd: nil, numero: nil, tipo: nil, ramal: nil, nome_contato: nil, padrao: nil)
    within "#telefone_#{ddd}_#{numero}" do
     expect(page).to have_content "(#{ddd}) #{numero}"
     expect(page).to have_content "#{tipo}"
     expect(page).to have_content "#{ramal}"            if ramal
     expect(page).to have_content "#{nome_contato}"     if nome_contato
    end

    assert_radio_checked("#telefone_#{ddd}_#{numero}")     if padrao == true
    assert_radio_not_checked("#telefone_#{ddd}_#{numero}") if padrao == false
  end
end
