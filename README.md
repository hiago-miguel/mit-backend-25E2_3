# Plataforma de Cursos - Frontend + Backend

Uma plataforma completa de cursos para fomentar a entrada no mercado de trabalho para diversas áreas.

## Tecnologias

### Frontend
- **Next.js** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **React** - Biblioteca de interface

### Backend
- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MySQL** - Banco de dados relacional
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas
- **Docker Compose** - Containerização para desenvolvimento

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Docker e Docker Compose (para MySQL local)

## Instalação e Execução

### 1. Configuração do Banco de Dados

```bash
# Subir MySQL com Docker Compose
docker-compose up -d

# Aguardar o MySQL estar pronto (cerca de 30 segundos)
```

### 2. Configuração das Variáveis de Ambiente

#### Backend
Crie o arquivo `server/.env`:
```env
# Configurações do Banco de Dados MySQL
DB_HOST=localhost
DB_USER=mituser
DB_PASSWORD=mitpass
DB_NAME=mit_backend

# Configurações do Servidor
PORT=3001
BASE_URL=http://localhost:3001

# Configurações de Segurança
JWT_SECRET=sua_senha_secreta_muito_segura_123

# Ambiente
NODE_ENV=development
```

#### Frontend
Crie o arquivo `.env.local` na raiz:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 3. Instalação e Execução

#### Frontend
```bash
# Instalar dependências
npm i

# Rodar aplicação
npm run dev
```

#### Backend
```bash
# Navegar para o diretório do backend
cd server

# Instalar dependências
npm install

# Inicializar banco de dados
npm run init-db

# Executar em desenvolvimento
npm run dev

# Executar em produção
npm start
```

## Scripts de Banco de Dados

### Backend (pasta `server/`)

```bash
# Inicializar banco com dados de exemplo
npm run init-db

# Limpar completamente o banco
npm run wipe-db

# Limpar e reinicializar
npm run wipe-db && npm run init-db
```

## Portas

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **MySQL**: localhost:3306

## Funcionalidades

### Públicas
- ✅ Cadastro de alunos
- ✅ Login de alunos
- ✅ Visualização de cursos disponíveis
- ✅ Logout seguro

### Autenticadas
- ✅ Inscrição em cursos
- ✅ Cancelamento de inscrições
- ✅ Visualização de cursos inscritos
- ✅ Gerenciamento de sessão

## Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT com cookies HttpOnly
- Validação de dados de entrada
- Controle de acesso baseado em autenticação
- Variáveis de ambiente para configurações sensíveis

## Estrutura do Projeto

```
mit-backend-25E2_3/
├── src/                    # Frontend (Next.js)
│   ├── app/               # Páginas da aplicação
│   ├── components/        # Componentes React
│   ├── config/           # Configurações
│   └── lib/              # Utilitários
├── server/               # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/       # Configurações do banco
│   │   ├── controllers/  # Controladores da API
│   │   ├── middleware/   # Middlewares
│   │   ├── models/       # Modelos de dados
│   │   ├── routes/       # Rotas da API
│   │   └── server.js     # Servidor principal
│   ├── database/         # Scripts do banco
│   │   ├── init.js       # Inicialização do banco
│   │   └── wipe.js       # Limpeza do banco
│   ├── .env              # Variáveis de ambiente
│   └── package.json      # Dependências do backend
├── docker-compose.yml    # Configuração MySQL
├── .env.local            # Variáveis do frontend
└── package.json          # Dependências do frontend
```

## Banco de Dados

### MySQL
- **Engine**: InnoDB
- **Relacionamentos**: Foreign keys com CASCADE
- **Índices**: Otimizados para consultas frequentes
- **Tabelas**:
  - `usuarios`: Dados dos usuários
  - `cursos`: Catálogo de cursos
  - `inscricoes`: Relacionamento usuário-curso

### Migração de SQLite para MySQL
O projeto foi migrado de SQLite para MySQL para melhor performance e escalabilidade em produção.

## Documentação do Back End

Consulte a [documentação do backend](server/README.md) para detalhes de configuração, rotas e uso da API.

## Licença

MIT License