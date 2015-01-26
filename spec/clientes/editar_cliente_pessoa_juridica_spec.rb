require "rails_helper"

describe "Como cadastrista", type: :feature, js: true do
  it "eu posso editar um cliente Pessoa Jurídica" do
    visit root_path

    click_link "Clientes"

    fill_in "cliente_cnpj", with: "11111111111111"
    click_button "Pesquisar"

    find(".cliente:last-child a").click

    expect(page).to     have_css "#pessoa_juridica"
    expect(page).to     have_css "#cliente_tipo_id option", text: "ASSOCIACOES"
    click_link "Pessoa Física"

    expect(page).to_not have_css "#pessoa_juridica"
    expect(page).to_not have_css "#cliente_tipo_id option", text: "ASSOCIACOES"

    select "RESIDENCIAL", from: "cliente_tipo_id"
    fill_in "cliente_nome", with: "NOVO NOME"
    fill_in "cliente_nome_abreviado", with: "NOVINHO NOMINHO"
    fill_in "cliente_email", with: "novo_nome@mail.com"

    within "#cliente_vencimento_mes_seguinte" do
      click_link "Sim"
    end
    within "#cliente_gera_fatura_antecipada" do
      click_link "Sim"
    end
    within "#cliente_permite_negativacao" do
      click_link "Sim"
    end

    preencher_pessoa_fisica
    preencher_enderecos
    adicionaTelefones

    click_button "Salvar Cliente"

    validar
  end

  def adicionar_oliveira_belo
    adicionar_cliente_endereco(cidade: "BELEM | PARA",
                                logradouro_nome: "OLIVEIRA BELO", logradouro_nome_popular: "OLIVEIRA-BELO",
                                tipo: "RESIDENCIAL", bairro: "UMARIZAL", cep: "66050380",
                                referencia: "NUMERO", numero: "1234", complemento: "APTO 55555",
                                perimetro_inicial_nome: "QUATORZE DE MARCO", perimetro_inicial_nome_popular: "14 DE MARCO",
                                perimetro_final_nome: "DEODORO", perimetro_final_nome_popular: "GENERALISSIMO DEODORO")

  end

  def remover_ultimo_endereco
    within "table#enderecos tbody tr:last-child" do
      find(".remove").click
    end
  end

  def preencher_enderecos
    adicionar_oliveira_belo
    expect(page).to have_css ".endereco", count: 2
    remover_ultimo_endereco

    expect(page).to_not have_css ".endereco.destroyed"
    remover_ultimo_endereco
    expect(page).to have_css ".endereco.destroyed", count: 1

    expect(page).to have_css ".endereco", count: 1
    adicionar_oliveira_belo
    expect(page).to have_css ".endereco", count: 2

    adicionar_cliente_endereco(cidade: "BELEM | PARA",
                                logradouro_nome: "DEODORO", logradouro_nome_popular: "GENERALISSIMO DEODORO",
                                tipo: "COMERCIAL", bairro: "UMARIZAL", cep: "55050720",
                                referencia: "NUMERO", numero: "4321", complemento: "VILA 25",
                                perimetro_inicial_nome: "OLIVEIRA BELO", perimetro_inicial_nome_popular: "OLIVEIRA-BELO",
                                perimetro_final_nome: "DIOGO MOIA", perimetro_final_nome_popular: "")
    find(".endereco[data-nome='DEODORO'] input[type='radio']").click

    expect(page).to have_css ".endereco.destroyed", count: 1
    expect(page).to have_css ".endereco", count: 3
  end

  def preencher_pessoa_fisica
    page.execute_script("$('input.hasDatepicker').removeAttr('readonly')")
    fill_in "cliente_cpf", with: "94239288111"
    fill_in "cliente_rg", with: "41238222"
    fill_in "cliente_data_emissao_rg", with: "10/01/1999"
    select "CREA", from: "cliente_orgao_emissor_rg_id"
    select "PARA | PA", from: "cliente_orgao_emissor_uf_id"

    fill_in "cliente_nascimento", with: "15/01/1988"
    select_from_autocomplete("pro", "PROGRAMADOR", "cliente_profissao")
    select "FEMININO", from: "cliente_pessoa_sexo_id"
    fill_in "cliente_nome_mae", with: "REGINA ALMEIDA"
  end

  def validar
    expect(page).to have_content "Cliente editado com sucesso"

    fill_in "cliente_nome", with: "NOVO NOME"
    fill_in "cliente_cpf", with: "94239288111"

    click_button "Pesquisar"

    find(".cliente:last-child a").click

    expect(page).to have_css "#cliente_tipo_id option[selected]", text: "RESIDENCIAL"
    expect(find_field('cliente_nome').value).to eql "NOVO NOME"
    expect(find_field('cliente_nome_abreviado').value).to eql "NOVINHO NOMINHO"
    expect(find_field('cliente_email').value).to eql "novo_nome@mail.com"
    expect(page).to have_css "#cliente_vencimento_mes_seguinte .active", text: "Sim"
    expect(page).to have_css "#cliente_gera_fatura_antecipada .active",  text: "Sim"
    expect(page).to have_css "#cliente_permite_negativacao .active",     text: "Sim"

    expect(find_field('cliente_cpf').value).to eql "94239288111"
    expect(find_field('cliente_rg').value).to eql "41238222"
    expect(find_field('cliente_data_emissao_rg').value).to eql "10/01/1999"
    expect(find_field('cliente_nascimento').value).to eql "15/01/1988"
    expect(page).to have_css "#cliente_orgao_emissor_rg_id option[selected]", text: "CREA"
    expect(page).to have_css "#cliente_profissao button", text: "PROGRAMADOR"
    expect(find_field('cliente_nome_mae').value).to eql "REGINA ALMEIDA"

    within "#enderecos" do
      expect(page).to have_css ".endereco", count: 2
      expect(page).to have_css ".endereco", text: "OLIVEIRA BELO - APTO 55555 - 1234 - UMARIZAL - BELEM | PARA - 66050380 - ENTRE QUATORZE DE MARCO E DEODORO"
      assert_radio_not_checked(".endereco[data-nome='OLIVEIRA BELO']")
      expect(page).to have_css ".endereco", text: "DEODORO - VILA 25 - 4321 - UMARIZAL - BELEM | PARA - 55050720 - ENTRE OLIVEIRA BELO E DIOGO MOIA"
      assert_radio_checked(".endereco[data-nome='DEODORO']")
    end

    valida_telefone_presente!(ddd: 11, numero: 33234565, tipo: "CELULAR", ramal: 44, nome_contato: "TELEFONISTA", padrao: false)
    valida_telefone_presente!(ddd: 51, numero: 777555,   tipo: "RESIDENCIAL", ramal: 111, nome_contato: "MAMAE", padrao: true)
    expect(page).to have_no_css "#telefone_21_11133344"
  end

  def adicionaTelefones
    click_link "Adicionar novo telefone"
    within "#telefone_form" do
      click_link "Cancelar"
    end

    adicionar_telefone ddd: 91, numero: 89917171, tipo: "CELULAR", ramal: "000", nome_contato: "O PROPRIO", padrao: false
    expect(page).to have_css ".telefone", count: 3

    within "#telefone_91_89917171" do
     find(".remove").click
    end
    expect(page).to have_no_css "#telefone_91_89917171"

    expect(page).to have_css ".telefone",           count: 2
    within "#telefone_21_11133344" do
      find("a.remove").click
    end
    expect(page).to have_css ".telefone",           count: 2
    expect(page).to have_css ".telefone.destroyed", count: 1

    adicionar_telefone ddd: 51, numero: 777555, tipo: "RESIDENCIAL", ramal: "111", nome_contato: "MAMAE", padrao: false
    within "#telefone_51_777555" do
      find("input[type='radio']").click
    end
    expect(page).to have_css ".telefone",           count: 3
    expect(page).to have_css ".telefone.destroyed", count: 1
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
