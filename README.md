# Ecommerce

Este é um projeto de ecommerce simples que consiste em um frontend Angular para a interface do usuário e um backend NestJS para a lógica de negócios e a API.

## Funcionalidades

O projeto de ecommerce permite:

- Visualizar produtos, serviços e combos disponíveis para compra.
- Adicionar itens ao carrinho de compras.
- Visualizar o carrinho de compras e remover itens.
- Realizar o checkout dos itens no carrinho.

## Pré-requisitos

Certifique-se de ter os seguintes pré-requisitos instalados em seu sistema:

- Node.js 18.x: Você pode baixar e instalar o Node.js a partir do [site oficial](https://nodejs.org/).
- Docker: O backend NestJS é executado em um contêiner Docker, portanto, certifique-se de ter o Docker instalado em seu sistema se desejar executar o backend usando Docker.

## Instalação e Execução

### Frontend (Angular)

1. Clone este repositório e navegue até o diretório do frontend:

    ```bash
    git clone https://github.com/seu-usuario/ecommerce.git
    cd ecommerce/frontend
    ```

2. Instale as dependências do projeto usando o npm:

    ```bash
    npm install
    ```

3. Inicie o servidor de desenvolvimento do frontend:

    ```bash
    npm start
    ```

    O aplicativo estará disponível em `http://localhost:4200`.

### Backend (NestJS)

1. Navegue até o diretório do backend:

    ```bash
    cd ../backend
    ```

2. Execute o backend usando Docker Compose:

    ```bash
    docker-compose up --build
    ```

    O backend estará disponível em `http://localhost:3000`.

## Contribuindo

Se você encontrar algum problema ou tiver sugestões de melhorias, sinta-se à vontade para abrir uma issue ou enviar um pull request.


