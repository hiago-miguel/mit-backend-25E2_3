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
- **SQLite** - Banco de dados relacional
- **JWT** - Autenticação
- **bcryptjs** - Criptografia de senhas

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação e Execução

### Frontend
```bash
# Instalar dependências
npm i

# Rodar aplicação
npm run dev
```

### Backend
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

## Portas

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001

## Funcionalidades

### Públicas
- ✅ Cadastro de alunos
- ✅ Login de alunos
- ✅ Visualização de cursos disponíveis

### Autenticadas
- ✅ Inscrição em cursos
- ✅ Cancelamento de inscrições
- ✅ Visualização de cursos inscritos

## Segurança

- Senhas criptografadas com bcrypt
- Autenticação JWT com cookies seguros
- Validação de dados de entrada
- Controle de acesso baseado em autenticação

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
│   └── package.json      # Dependências do backend
└── package.json          # Dependências do frontend
```

## Documentação do Back End

Consulte a [documentação do backend](server/README.md) para detalhes de configuração, rotas e uso da API.

## Licença

MIT License