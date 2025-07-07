# Backend - Plataforma de Cursos

Backend desenvolvido em Node.js com Express para a plataforma de cursos.

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **SQLite** - Banco de dados relacional
- **JWT** - Autenticação via tokens
- **bcryptjs** - Criptografia de senhas
- **express-validator** - Validação de dados
- **cors** - Cross-Origin Resource Sharing
- **cookie-parser** - Parse de cookies

## Pré-requisitos

- Node.js (versão 20 ou superior)
- npm ou yarn

## Instalação Backend

1. **Instalar dependências:**
```bash
cd server
npm install
```

2. **Inicializar banco de dados:**
```bash
npm run init-db
```

3. **Executar em desenvolvimento:**
```bash
npm run dev
```

4. **Executar em produção:**
```bash
npm start
```

### Instalação Frontend

1. **Instalar dependências:**
```bash
npm install
```

2. **Executar em desenvolvimento:**
```bash
npm run dev
```

## Estrutura do Banco de Dados

### Tabelas

#### `usuarios`
- `id` (INTEGER, PRIMARY KEY)
- `nome` (TEXT, NOT NULL)
- `email` (TEXT, UNIQUE, NOT NULL)
- `senha` (TEXT, NOT NULL) - Criptografada com bcrypt
- `nascimento` (TEXT, NOT NULL)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

#### `cursos`
- `id` (INTEGER, PRIMARY KEY)
- `nome` (TEXT, NOT NULL)
- `descricao` (TEXT, NOT NULL)
- `capa` (TEXT, NOT NULL) - URL da imagem
- `inicio` (TEXT, NOT NULL) - Data de início
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

#### `inscricoes`
- `id` (INTEGER, PRIMARY KEY)
- `usuario_id` (INTEGER, FOREIGN KEY)
- `curso_id` (INTEGER, FOREIGN KEY)
- `cancelada` (BOOLEAN, DEFAULT FALSE)
- `data_cancelamento` (DATETIME)
- `created_at` (DATETIME, DEFAULT CURRENT_TIMESTAMP)

## Endpoints da API

### Autenticação

#### POST `/usuarios`
Cadastrar novo usuário.

**Body:**
```json
{
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "senha": "senha123",
  "nascimento": "01/01/1990"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Usuário cadastrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "Nome do Usuário",
    "email": "usuario@email.com",
    "nascimento": "01/01/1990"
  }
}
```

#### POST `/login`
Realizar login.

**Body:**
```json
{
  "email": "usuario@email.com",
  "senha": "senha123"
}
```

**Resposta (200):**
```json
{
  "mensagem": "Login realizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "Nome do Usuário",
    "email": "usuario@email.com"
  }
}
```
*O token JWT é configurado automaticamente nos cookies.*

### Cursos

#### GET `/cursos`
Listar todos os cursos disponíveis (público).

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "JavaScript Básico",
    "descricao": "Aprenda os fundamentos do JavaScript",
    "capa": "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=JavaScript",
    "inscricoes": 5,
    "inicio": "15/01/2024",
    "inscrito": false
  }
]
```

#### POST `/cursos`
Listar cursos com filtro (público).

**Body (opcional):**
```json
{
  "filtro": "JavaScript"
}
```

#### GET `/cursos/inscritos`
Listar cursos com status de inscrição do usuário logado.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "JavaScript Básico",
    "descricao": "Aprenda os fundamentos do JavaScript",
    "capa": "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=JavaScript",
    "inscricoes": 5,
    "inicio": "15/01/2024",
    "inscrito": true,
    "inscricao_cancelada": false
  }
]
```

#### POST `/cursos/:idCurso`
Inscrever em um curso.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
{
  "mensagem": "Inscrição realizada com sucesso"
}
```

#### DELETE `/cursos/:idCurso`
Cancelar inscrição em um curso.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
{
  "mensagem": "Inscrição cancelada com sucesso"
}
```

### Usuários

#### GET `/me`
Buscar dados do usuário logado.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "nascimento": "01/01/1990",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET `/:idUsuario`
Buscar dados de um usuário específico.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
{
  "id": 1,
  "nome": "Nome do Usuário",
  "email": "usuario@email.com",
  "nascimento": "01/01/1990",
  "created_at": "2024-01-01T00:00:00.000Z"
}
```

#### GET `/:idUsuario/cursos`
Listar cursos inscritos de um usuário específico.

**Headers:** `Cookie: token=<jwt_token>`

**Resposta (200):**
```json
[
  {
    "id": 1,
    "nome": "JavaScript Básico",
    "descricao": "Aprenda os fundamentos do JavaScript",
    "capa": "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=JavaScript",
    "inscricoes": 5,
    "inicio": "15/01/2024",
    "inscricao_cancelada": false,
    "inscrito": true
  }
]
```

## Segurança

- **Senhas criptografadas** com bcrypt (salt rounds: 10)
- **JWT** para autenticação com expiração de 24 horas
- **Cookies httpOnly** para armazenamento seguro do token
- **Validação de dados** com express-validator
- **Controle de acesso** baseado em autenticação
- **Sanitização** de dados de entrada

## Códigos de Status

- **200** - Sucesso
- **400** - Erro de validação ou dados inválidos
- **403** - Acesso negado (não autenticado)
- **404** - Recurso não encontrado
- **500** - Erro interno do servidor

## ariáveis de Ambiente

```env
PORT=3001
NODE_ENV=development
JWT_SECRET=sua_chave_secreta_jwt
```

## Estrutura do Projeto

```
server/
├── src/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── usuarioController.js
│   │   └── cursoController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── models/
│   │   ├── Usuario.js
│   │   ├── Curso.js
│   │   └── Inscricao.js
│   ├── routes/
│   │   └── index.js
│   └── server.js
├── database/
│   └── init.js
├── package.json
└── README.md
```

## Testes

Para testar a API, você pode usar:

1. **Postman** ou **Insomnia**
2. **curl** no terminal
3. **Frontend** integrado (rodando na porta 3000)

### Exemplo com curl:

```bash
# Cadastrar usuário
curl -X POST http://localhost:3001/usuarios \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@email.com","senha":"123456","nascimento":"01/01/1990"}'

# Fazer login
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"email":"teste@email.com","senha":"123456"}' \
  -c cookies.txt

# Listar cursos (com cookie de autenticação)
curl -X GET http://localhost:3001/cursos/inscritos \
  -b cookies.txt
```

## Licença

MIT License 