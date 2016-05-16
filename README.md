# GSAN Online

Parte cliente dos cadastros do GSAN

### Instalar o gerenciador de versões Ruby (http://rvm.io)
    curl -sSL https://get.rvm.io | bash -s stable

### Usar a versão 2 do Ruby
    rvm install 2.3.0

### Fazer o clone do projeto
    git clone [URL DO REPOSITÓRIO]

### Acessar o projeto
    cd gsan_online

### Instalar as dependências do projeto
    bundle install

### Configurar o TimeZone em config/application.rb

## Ambiente de Desenvolvimento

### Executar o gsan_online no localhost:3000
    rails server

### Executar o gsan_cadastro no localhost:3001
   cd ../gsan_cadastro
   rails server -p 3001

## Ambiente de Produção

### Precompilar assets
    rake assets:precompile

### Gerar o token de segurança da aplicação
    echo "SECRET_TOKEN=`bundle exec rake secret`" > .env

### Criar uma variavel de ambiente CADASTRO_URL apontando para a url do gsan_cadastro (não esquecer do http://)

### Setar variável de ambiente RAILS_SERVE_STATIC_FILES como true se não usar Nginx ou Apache

## Ambiente de Testes

### Rodar os testes de integração (gsan_cadastro deve estar instalado e configurado na mesma pasta do gsan_online)
    ./test
