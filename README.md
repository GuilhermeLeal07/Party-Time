# Party Time

Aplicação web para criação e gerenciamento de festas, permitindo cadastrar eventos, selecionar serviços, definir um orçamento e acompanhar os detalhes de cada festa. O projeto utiliza **React** no front-end, uma **API REST com Node.js e Express** e **MongoDB** com Mongoose.

**Acesse o projeto:** [Party Time – Aplicação publicada](https://party-time-vpndootsy-guilhermeleal07s-projects.vercel.app)

## Funcionalidades

- Listar festas cadastradas.
- Criar uma festa com título, responsável, descrição, imagem e orçamento.
- Visualizar os detalhes de uma festa.
- Editar as informações de uma festa.
- Excluir uma festa.
- Listar os serviços disponíveis.
- Cadastrar, consultar, atualizar e excluir serviços por meio da API.
- Selecionar serviços para compor uma festa.
- Calcular e validar os custos dos serviços selecionados em relação ao orçamento disponível.
- Impedir a criação ou atualização de uma festa quando o valor dos serviços ultrapassa o orçamento informado.

**Observação:** o projeto não possui sistema de autenticação de usuários. As operações de gerenciamento são disponibilizadas pela API sem uma camada de login.

## Tecnologias utilizadas

### Front-end
- React
- Vite
- React Router
- JavaScript (ES modules)
- Axios
- React Toastify
- CSS

### Back-end
- Node.js
- Express
- Mongoose
- dotenv
- CORS

### Banco de dados
- MongoDB Atlas (ou outra instância MongoDB acessível)

## Requisitos

Antes de executar o projeto, instale:

- [Node.js](https://nodejs.org/)
- npm (incluído na instalação do Node.js)
- Uma instância MongoDB local ou uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)

## Como executar localmente

O front-end e o back-end são iniciados separadamente. Os comandos abaixo pressupõem que as pastas `backend` e `frontend` estejam no diretório principal do projeto.

### 1. Configurar e iniciar o back-end

No terminal, entre na pasta do back-end e instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo `.env` dentro da pasta `backend`:

```env
MONGODB_URI=sua_uri_de_conexao
PORT=3000
```

Configure `MONGODB_URI` com a URI de conexão do seu banco de dados MongoDB.

**Não compartilhe nem envie o arquivo `.env` para o GitHub.** As credenciais devem permanecer apenas no ambiente local ou nas configurações da plataforma de hospedagem.

Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

Como alternativa, execute `npm start` para iniciar o servidor sem o Nodemon.

Por padrão, a API fica disponível em:

```text
http://localhost:3000
```

As rotas da aplicação utilizam o prefixo `/api`.

### 2. Configurar e iniciar o front-end

Abra um **segundo terminal**. A partir do diretório principal do projeto, execute:

```bash
cd frontend
npm install
```

Crie um arquivo `.env` dentro da pasta `frontend`:

```env
VITE_API_URL=http://localhost:3000/api/
```

Essa variável define o endereço utilizado pelo Axios para acessar a API.

O projeto também possui um endereço local alternativo configurado no cliente Axios, permitindo executar o front-end localmente caso `VITE_API_URL` não esteja definida.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço local informado pelo Vite.

Sempre que alterar variáveis de ambiente do front-end, reinicie o servidor Vite para que as mudanças sejam aplicadas.

## Rotas principais da API

Todas as rotas abaixo utilizam o prefixo `/api`.

### Festas

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/parties` | Lista as festas cadastradas |
| `POST` | `/api/parties` | Cria uma nova festa |
| `GET` | `/api/parties/:id` | Consulta uma festa específica |
| `PUT` | `/api/parties/:id` | Atualiza as informações de uma festa |
| `DELETE` | `/api/parties/:id` | Exclui uma festa |

### Serviços

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/api/services` | Lista os serviços disponíveis |
| `POST` | `/api/services` | Cadastra um novo serviço |
| `GET` | `/api/services/:id` | Consulta um serviço específico |
| `PUT` | `/api/services/:id` | Atualiza as informações de um serviço |
| `DELETE` | `/api/services/:id` | Exclui um serviço |

## Segurança e manutenção

- Não publique arquivos `.env`, senhas, tokens ou URIs privadas.
- Não versione diretórios de dependências (`node_modules`) nem arquivos gerados de build (`dist`).
- Mantenha as credenciais do MongoDB protegidas.
- A validação de orçamento é realizada no back-end, tanto na criação quanto na atualização de festas.
- A API realiza validações de identificadores e trata erros relacionados às operações com o banco de dados.
- O projeto não implementa autenticação ou autorização de usuários.

## Publicação (deploy)

A aplicação está publicada utilizando Vercel para o front-end, Render para a API e MongoDB Atlas para o banco de dados.

**Acesse:** [https://party-time-vpndootsy-guilhermeleal07s-projects.vercel.app](https://party-time-vpndootsy-guilhermeleal07s-projects.vercel.app)

**API:** [https://party-time-api-zocx.onrender.com](https://party-time-api-zocx.onrender.com)

Configure as variáveis de ambiente diretamente nas configurações de cada serviço:

- **Back-end (Render):** `MONGODB_URI` e `PORT` (fornecida pela plataforma).
- **Front-end (Vercel):** `VITE_API_URL` com o endereço público da API, incluindo o prefixo `/api/`.

### Atenção à conexão com o MongoDB Atlas

O acesso ao banco de dados depende das regras de rede configuradas no MongoDB Atlas.

Durante a configuração do deploy, foi necessário liberar o acesso de rede para que o Render pudesse estabelecer conexão com o banco.

A regra `0.0.0.0/0` permite conexões de qualquer endereço IP. Embora possa facilitar a configuração, ela amplia a superfície de acesso e deve ser utilizada com cautela. Mantenha as credenciais protegidas e considere alternativas mais restritivas para ambientes de produção.

Planos gratuitos podem apresentar limites de uso e suspensão por inatividade. Consulte as condições atuais das plataformas utilizadas.

## Créditos e melhorias técnicas

O Party Time foi desenvolvido como projeto prático de estudos e reúne a aplicação de conceitos de desenvolvimento front-end e back-end.

Durante a preparação e publicação do projeto, foram trabalhados aspectos técnicos como:

- Organização da aplicação em front-end e back-end.
- Integração entre React e uma API REST.
- Operações CRUD com Node.js, Express e Mongoose.
- Persistência de dados no MongoDB Atlas.
- Configuração de variáveis de ambiente.
- Validação de orçamento no back-end.
- Tratamento de erros e estados de carregamento no front-end.
- Publicação independente do front-end e do back-end.
- Configuração de conexão entre Vercel, Render e MongoDB Atlas.

Novas funcionalidades ou alterações autorais devem ser documentadas nesta seção conforme forem definidas e implementadas.
