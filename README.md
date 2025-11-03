# Volvo Home Charge 🚗⚡

Aplicação web para comparar custos entre veículos elétricos Volvo e veículos a combustão, desenvolvida para demonstrar as vantagens do carregamento doméstico.

## 🏗️ Arquitetura

```
┌─────────────────────┐
│   Frontend (React)  │ ← Interage com usuário
│   Azure Static Web  │
└──────────┬──────────┘
           │
           │ HTTP Request
           ▼
┌─────────────────────────────┐
│   Backend API (Azure Func)  │ ← Proxy seguro
│   /api/GetCompetitorVehicles│
└──────────┬──────────────────┘
           │
           │ API Request (com credenciais)
           ▼
┌─────────────────────────────┐
│      Supabase Database      │ ← Banco de dados
│    Tabela: inmetro_database │
└─────────────────────────────┘
```

### 🔐 Segurança

- ✅ **Credenciais protegidas**: Chaves do Supabase nunca expostas no frontend
- ✅ **API Gateway**: Azure Function atua como proxy seguro
- ✅ **CORS configurado**: Comunicação segura entre frontend e backend
- ✅ **Variáveis de ambiente**: Configurações sensíveis isoladas

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+ ou 20+
- Conta no Azure com:
  - Azure Functions
  - Azure Static Web Apps
  - Storage Account (opcional)
- Conta no Supabase com projeto configurado
- Azure Functions Core Tools

### 1️⃣ Configuração Local

#### Backend

```bash
cd api

# Instalar dependências
npm install

# Configurar credenciais
cp local.settings.json.example local.settings.json
# Edite local.settings.json com suas credenciais do Supabase

# Executar localmente
func start
```

Backend rodando em: `http://localhost:7071/api/GetCompetitorVehicles`

#### Frontend

```bash
# Na raiz do projeto

# Criar arquivo .env
echo "VITE_API_BACKEND_URL=http://localhost:7071/api" > .env

# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev
```

Frontend rodando em: `http://localhost:8080`

### 2️⃣ Deploy no Azure

#### Backend (Azure Functions)

```bash
cd api

# Login no Azure
az login

# Criar Resource Group
az group create --name rg-volvo-homecharge --location eastus

# Criar Storage Account
az storage account create \
  --name storagevolvohomecharge \
  --resource-group rg-volvo-homecharge \
  --sku Standard_LRS

# Criar Function App
az functionapp create \
  --resource-group rg-volvo-homecharge \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name api-volvo-homecharge \
  --storage-account storagevolvohomecharge

# Configurar variáveis de ambiente
az functionapp config appsettings set \
  --name api-volvo-homecharge \
  --resource-group rg-volvo-homecharge \
  --settings \
    SUPABASE_URL="https://seu-projeto.supabase.co" \
    SUPABASE_ANON_KEY="sua-chave-anonima" \
    SUPABASE_TABLE_NAME="inmetro_database"

# Deploy
func azure functionapp publish api-volvo-homecharge
```

#### Frontend (Azure Static Web Apps)

1. No Azure Portal, criar novo Static Web App
2. Conectar ao repositório GitHub
3. Configurar build:
   - **App location**: `/`
   - **Api location**: `/api`
   - **Output location**: `dist`
4. Adicionar variável de ambiente:
   - `VITE_API_BACKEND_URL`: URL da Azure Function

## 📁 Estrutura do Projeto

```
.
├── api/                              # Backend Azure Functions
│   ├── GetCompetitorVehicles/       # Função HTTP
│   │   ├── function.json
│   │   └── index.js
│   ├── host.json                    # Configuração global
│   ├── local.settings.json.example  # Template de configuração
│   ├── package.json
│   ├── README.md                    # Docs da API
│   └── DEVELOPMENT.md               # Guia de desenvolvimento
├── src/                             # Frontend React
│   ├── components/                  # Componentes UI
│   │   ├── steps/                  # Steps do wizard
│   │   └── ui/                     # Shadcn components
│   ├── data/                       # Dados e APIs
│   ├── pages/                      # Páginas
│   └── utils/                      # Utilitários
├── public/                         # Assets estáticos
├── .github/workflows/              # CI/CD
│   └── deploy-api.yml
├── README.md                       # Este arquivo
└── package.json

```

## 🔧 Tecnologias

### Frontend
- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Shadcn/UI** - Component library
- **Framer Motion** - Animações
- **Recharts** - Gráficos
- **React Router** - Navegação

### Backend
- **Azure Functions** - Serverless API
- **Node.js 20** - Runtime
- **Supabase** - Database (via REST API)

### Infraestrutura
- **Azure Static Web Apps** - Hosting frontend
- **Azure Functions** - Backend API
- **GitHub Actions** - CI/CD
- **Supabase** - PostgreSQL database

## 📊 Fluxo de Dados

1. Usuário acessa a aplicação
2. Seleciona veículo Volvo elétrico
3. Busca veículo competidor a combustão via API backend
4. Configura parâmetros de uso (km/dia, % cidade/estrada)
5. Define preços (energia, combustível, etc.)
6. Visualiza comparação de custos
7. Pode exportar resultados em PDF

## 🔍 Dados Utilizados

### Volvo (Frontend)
- Dados hardcoded em `src/data/volvoVehicles.ts`

### Competidores (Supabase)
- Fonte: INMETRO
- Tabela: `inmetro_database`
- Campos: marca, modelo, consumo cidade/estrada, tipo combustível

## 📝 Variáveis de Ambiente

### Backend

Ver: `api/ENV_VARIABLES.md`

| Variável | Descrição |
|----------|-----------|
| `SUPABASE_URL` | URL do projeto Supabase |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase |
| `SUPABASE_TABLE_NAME` | Nome da tabela (opcional) |

### Frontend

| Variável | Descrição |
|----------|-----------|
| `VITE_API_BACKEND_URL` | URL da Azure Function |

## 🧪 Testes

```bash
# Backend
cd api
curl http://localhost:7071/api/GetCompetitorVehicles

# Frontend
npm run dev
# Abra http://localhost:8080
```

## 📚 Documentação Adicional

- [API Backend](api/README.md) - Documentação da API
- [Desenvolvimento](api/DEVELOPMENT.md) - Guia de dev
- [Variáveis de Ambiente](api/ENV_VARIABLES.md) - Configuração de env vars

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é proprietário da Volvo Cars.

---

Desenvolvido com ❤️ para demonstrar as vantagens do carregamento elétrico doméstico.
