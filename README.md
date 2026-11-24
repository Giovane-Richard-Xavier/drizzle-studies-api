````markdown
# Drizzle Studies API

API REST desenvolvida com NestJS e Drizzle ORM para estudos de integração entre TypeScript, PostgreSQL e Docker.

## Funcionalidades

- Cadastro de usuários
- Listagem paginada de usuários
- Consulta de usuário por ID
- Atualização parcial de usuários
- Validação dos dados recebidos
- Prevenção de emails duplicados
- Suporte a execução com Docker
- pgAdmin para gerenciamento do PostgreSQL

## Tecnologias utilizadas

- Node.js 20
- TypeScript
- NestJS
- Express
- PostgreSQL
- Drizzle ORM
- Drizzle Kit
- Docker
- Docker Compose
- pgAdmin
- Class Validator
- Class Transformer
- Jest
- Supertest
- ESLint
- Prettier

## Pré-requisitos

### Docker

- Docker
- Docker Compose

### Execução local

- Node.js 20 ou superior
- npm
- PostgreSQL

## Configuração do ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```
````

Configure as variáveis:

```env
PORT=3001
NODE_ENV=development

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=drizzle_db

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/drizzle_db?schema=public

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

Ao utilizar Docker Compose, altere o endereço do banco para o nome do serviço:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/drizzle_db?schema=public
```

## Executando com Docker

Na raiz do projeto:

```bash
docker compose up --build
```

Serviços disponíveis:

| Serviço    | Endereço               |
| ---------- | ---------------------- |
| API        | http://localhost:3001  |
| PostgreSQL | localhost:5432         |
| pgAdmin    | http://localhost:15432 |

Dados de acesso ao pgAdmin:

- Email: `admin@admin.com`
- Senha: `admin`

Para encerrar:

```bash
docker compose down
```

## Executando localmente

Instale as dependências:

```bash
npm install
```

Inicie em modo de desenvolvimento:

```bash
npm run start:dev
```

A API ficará disponível em:

```text
http://localhost:3001
```

## Scripts disponíveis

| Comando               | Descrição                    |
| --------------------- | ---------------------------- |
| `npm run start`       | Inicia a aplicação           |
| `npm run start:dev`   | Inicia em modo watch         |
| `npm run start:debug` | Inicia em modo debug         |
| `npm run start:prod`  | Executa a compilação         |
| `npm run build`       | Compila o projeto            |
| `npm run test`        | Executa testes unitários     |
| `npm run test:watch`  | Executa testes em modo watch |
| `npm run test:cov`    | Gera relatório de cobertura  |
| `npm run test:e2e`    | Executa testes E2E           |
| `npm run lint`        | Executa o ESLint             |
| `npm run format`      | Formata arquivos TypeScript  |

## Migrações do Drizzle

Para gerar uma migração:

```bash
npx drizzle-kit generate
```

Para aplicar migrações:

```bash
npx drizzle-kit migrate
```

## Estrutura do projeto

```text
src/
├── common/
│   └── dto/
├── db/
├── libs/
├── requests/
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

## Rotas da API

### Rota inicial

#### `GET /`

Retorna uma mensagem de demonstração.

```bash
curl http://localhost:3001/
```

Resposta:

```text
Hello World!
```

### Usuários

#### `POST /users`

Cria um novo usuário.

```json
{
  "name": "Giovane Richard Xavier",
  "email": "giovane@example.com",
  "age": 30
}
```

Exemplo:

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Giovane Richard Xavier",
    "email": "giovane@example.com",
    "age": 30
  }'
```

#### `GET /users`

Lista usuários com paginação.

Parâmetros opcionais:

| Parâmetro | Tipo    | Padrão | Restrições    |
| --------- | ------- | -----: | ------------- |
| `page`    | inteiro |    `1` | mínimo 1      |
| `limit`   | inteiro |   `10` | entre 1 e 100 |

Exemplo:

```bash
curl "http://localhost:3001/users?page=1&limit=10"
```

Resposta:

```json
{
  "users": [
    {
      "id": "8fda3422-a0de-41d7-b8aa-5fb3f8a52217",
      "name": "giovane richard xavier",
      "email": "giovane@example.com"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "limit": 10,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

#### `GET /users/:id`

Consulta um usuário pelo UUID.

```bash
curl http://localhost:3001/users/8fda3422-a0de-41d7-b8aa-5fb3f8a52217
```

#### `PATCH /users/:id`

Atualiza parcialmente um usuário.

```json
{
  "name": "Novo nome",
  "email": "novo@example.com",
  "age": 31
}
```

Exemplo:

```bash
curl -X PATCH http://localhost:3001/users/8fda3422-a0de-41d7-b8aa-5fb3f8a52217 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Novo nome",
    "age": 31
  }'
```

#### `DELETE /users/:id`

Solicita a remoção de um usuário.

```bash
curl -X DELETE http://localhost:3001/users/8fda3422-a0de-41d7-b8aa-5fb3f8a52217
```

> Atualmente, esta rota retorna uma mensagem informativa e ainda não remove o registro do banco.

## Modelo de dados

### Tabela `users`

| Campo   | Tipo         | Restrições                             |
| ------- | ------------ | -------------------------------------- |
| `id`    | UUID         | chave primária, gerado automaticamente |
| `name`  | varchar(255) | obrigatório                            |
| `age`   | integer      | obrigatório                            |
| `email` | varchar(255) | obrigatório e único                    |

### Tabela `pets`

| Campo     | Tipo         | Restrições                              |
| --------- | ------------ | --------------------------------------- |
| `id`      | UUID         | chave primária, gerado automaticamente  |
| `name`    | varchar(150) | obrigatório                             |
| `ownerId` | UUID         | obrigatório, referência para `users.id` |

```

```
