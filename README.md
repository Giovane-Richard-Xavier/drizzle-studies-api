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

PORT=3001
NODE_ENV=development

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=drizzle_db

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/drizzle_db?schema=public

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin

# Executando com Docker
docker compose up --build

### Migrações do Drizzle
npx drizzle-kit generate

### Para gerar uma migração:
npx drizzle-kit migrate

### Estrutura do projeto
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

curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Giovane Richard Xavier",
    "email": "giovane@example.com",
    "age": 30
  }'
```
