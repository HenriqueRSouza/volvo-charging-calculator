# Guia de Desenvolvimento - API

## 🔧 Configuração do Ambiente

### 1. Instalar Ferramentas Necessárias

```bash
# Node.js 18+ ou 20+
node --version

# Azure Functions Core Tools
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# Verificar instalação
func --version
```

### 2. Configurar Projeto Local

```bash
# Navegar para a pasta da API
cd api

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp local.settings.json.example local.settings.json
```

### 3. Obter Credenciais do Supabase

1. Acesse: https://supabase.com
2. Selecione seu projeto
3. Vá em "Settings" → "API"
4. Copie:
   - **Project URL**: Usado para `SUPABASE_URL`
   - **anon public key**: Usado para `SUPABASE_ANON_KEY`

### 4. Configurar local.settings.json

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "SUPABASE_URL": "https://xxxxxxxxxxxxx.supabase.co",
    "SUPABASE_ANON_KEY": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "SUPABASE_TABLE_NAME": "inmetro_database"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```

## 🚀 Executar Localmente

```bash
# Na pasta api/
func start

# Ou especificando porta
func start --port 7071
```

A API estará disponível em: `http://localhost:7071/api/GetCompetitorVehicles`

## 🧪 Testar

### Via cURL

```bash
curl http://localhost:7071/api/GetCompetitorVehicles
```

### Via Postman ou Insomnia

1. Método: `GET`
2. URL: `http://localhost:7071/api/GetCompetitorVehicles`
3. Headers: Nenhum necessário

### Via Browser

Abra: `http://localhost:7071/api/GetCompetitorVehicles`

## 📊 Logs

Os logs aparecem no terminal onde você executou `func start`.

Para logs detalhados:

```bash
func start --verbose
```

## 🏗️ Estrutura de Arquivos

```
api/
├── GetCompetitorVehicles/     # Função Azure
│   ├── function.json          # Configuração da função
│   └── index.js              # Código da função
├── .deployment               # Configuração de deploy
├── .funcignore              # Arquivos ignorados
├── .gitignore              # Arquivos git ignored
├── host.json               # Configuração global
├── local.settings.json     # Variáveis locais (não commit)
├── package.json           # Dependências
└── README.md             # Documentação
```

## 🔍 Debug

### Visual Studio Code

1. Instalar extensão: "Azure Functions"
2. Abrir pasta `api/`
3. Pressionar F5 para debug
4. Breakpoints funcionarão normalmente

### Chrome DevTools

```bash
# Executar com debug
func start --nodeDebugPort 9229
```

Depois, no Chrome: `chrome://inspect` → "Open dedicated DevTools for Node"

## 📝 Adicionar Novas Funções

```bash
cd api

# Criar nova função
func new

# Selecionar: "HTTP trigger"
# Nome: MyNewFunction
```

Estrutura criada:
```
api/
└── MyNewFunction/
    ├── function.json
    └── index.js
```

## 🌐 Diferenças: Local vs Azure

| Aspecto | Local | Azure |
|---------|-------|-------|
| URL | `http://localhost:7071/api/...` | `https://api-volvo-homecharge.azurewebsites.net/api/...` |
| Variáveis de ambiente | `local.settings.json` | Azure Portal → Configuration |
| CORS | Configurado no `host.json` | Configurado no Portal |
| Logs | Terminal | Azure Portal → Log stream |
| Warm-up | Sempre frio | Warm após primeira execução |

## 🐛 Troubleshooting Comum

### Erro: "func: command not found"
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### Erro: "Cannot find module '@azure/functions'"
```bash
cd api
npm install
```

### Erro: "Port already in use"
```bash
# Verificar processos
netstat -ano | findstr :7071

# Ou usar porta diferente
func start --port 7072
```

### Erro: "Credenciais do Supabase não configuradas"
- Verifique se `local.settings.json` existe
- Verifique se as variáveis estão corretas
- Reinicie o `func start`

### CORS bloqueando requisições do frontend
Editar `api/host.json`:
```json
{
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "http://localhost:5173,http://localhost:3000"
  }
}
```

## 📚 Próximos Passos

1. ✅ API funcional localmente
2. ⏭️ Deploy no Azure
3. ⏭️ Configurar CORS no Azure Portal
4. ⏭️ Atualizar frontend para usar a API
5. ⏭️ Testar integração completa

