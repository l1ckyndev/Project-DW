# Ginger, Aplicação para facilitar uso de comandos dig e traceroute

## Descrição do Projeto

Este projeto é uma aplicação web que visa facilitar o uso dos comandos dig e traceroute, permitindo que usuários sem experiência com a linha de comando possam utilizar essas ferramentas de forma simples e intuitiva. A interface gráfica foi desenhada para ser amigável (newbie-friendly), oferecendo uma experiência acessível e visual para quem deseja realizar diagnósticos de rede.

## Telas do Sistema

- *Tela Inicial*:
  
- *Resultados do Comando dig*: 

- *Resultados do Comando traceroute*:
  

## Funcionalidades do Projeto

- Execução dos comandos dig e traceroute via interface gráfica.
- Visualização dos resultados em tempo real.
- Histórico para salvar os resultados em formato texto.
- Interface amigável para usuários sem experiência com linha de comando.
- Suporte a múltiplos usuários com autenticação básica.

## Dependências

As dependências utilizadas neste projeto são:



    "@prisma/client": "^5.20.0",

    "bcrypt": "^5.1.1",

    "bcryptjs": "^2.4.3",

    "body-parser": "^1.20.3",

    "cors": "^2.8.5",

    "dotenv": "^16.4.5",

    "express": "^4.21.0",

    "json-server": "^0.17.0",

    "jsonwebtoken": "^9.0.2",

    "mysql": "^2.18.1",

    "mysql2": "^3.11.3",

    "pg": "^8.13.0",

    "sequelize": "^6.37.3"



## Instruções de Instalação

### Pré-requisitos

- Node.js instalado (v16+)
- Banco de dados MySQL ou PostgreSQL

*Passo a passo*

Clone o repositório:

    git clone https://github.com/usuario/repositorio.git

Instale as dependências:

    npm install

Configure as variáveis de ambiente:

- Crie um arquivo .env na raiz do projeto e adicione as seguintes variáveis:

      DATABASE_URL=mysql://user:password@localhost:3306/dbname
      JWT_SECRET=sua-chave-secreta

Execute o Docker Compose para subir o ambiente de banco de dados:

    docker-compose up -d
    
  Execute as migrações do banco de dados (se estiver utilizando Prisma):
    
    npx prisma migrate dev
    
  Inicie o servidor:
    
    npm start

## Informações de Contato

Em caso de dúvidas ou sugestões, entre em contato com:

- Cássio Bastos: cassio.bastos@academico.ifpb.edu.br
- Lucas Gabriel: lucas.sousa.1@academico.ifpb.edu.br
- Lucas Vinícius: candido.lucas@academico.ifpb.edu.br
