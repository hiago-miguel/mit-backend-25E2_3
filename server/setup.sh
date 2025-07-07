#!/bin/bash

echo "🚀 Configurando o Backend da Plataforma de Cursos..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não está instalado. Por favor, instale o Node.js primeiro."
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo "✅ Dependências instaladas com sucesso"

# Inicializar banco de dados
echo "🗄️ Inicializando banco de dados..."
npm run init-db

if [ $? -ne 0 ]; then
    echo "❌ Erro ao inicializar banco de dados"
    exit 1
fi

echo "✅ Banco de dados inicializado com sucesso"

echo ""
echo "🎉 Backend configurado com sucesso!"
echo ""
echo "Para executar o backend:"
echo "  npm run dev    # Modo desenvolvimento"
echo "  npm start      # Modo produção"
echo ""
echo "O backend estará disponível em: http://localhost:3001"
echo "Health check: http://localhost:3001/health" 