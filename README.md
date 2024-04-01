# Gerenciador-tramites
Gerenciado de Tramites

# Instruções para executar o projeto

Este projeto precisa a execução de dois terminais separados: para o frontend e para o backend, já que utilizo a estrutura de monorepositorio.

## Frontend

1. Abra um terminal.

2. Navegue até o diretório do frontend.

cd gerenciador

3. Instale as dependências do projeto.

npm install

4. Execute o servidor de desenvolvimento.

npm run dev


Isso iniciará o servidor do frontend. Você pode acessar o frontend em http://localhost:5713.


## Backend

1. Abra um segundo terminal.

2. Certifique-se de ter o Docker instalado e em execução.

3. Navegue até o diretório do backend.

cd tramites

4. Inicie os contêineres Docker usando o docker-compose.

docker-compose up

Isso iniciará os serviços necessários para o backend.


5. Instale as dependências do projeto.

npm install

arduino
Copy code

6. Inicie o servidor de desenvolvimento do backend.

npm run start:dev


Isso iniciará o servidor do backend. Ele estará em http://localhost:3333.

Agora o projeto vai estar pronto para uso
