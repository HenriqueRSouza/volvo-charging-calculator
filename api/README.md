# API Backend - Volvo Home Charge

Esta API Azure Function atua como proxy seguro para consumir dados do Supabase sem expor credenciais no frontend.

## 📋 Pré-requisitos

- Node.js 18+ ou 20+
- Azure Functions Core Tools 4.x
- Conta no Azure com Azure Functions
- Supabase configurado com tabela `inmetro_database`

## 🚀 Configuração Local

1. **Instalar Azure Functions Core Tools**:
   ```bash
   npm install -g azure-functions-core-tools@4 --unsafe-perm true
   ```

2. **Configurar variáveis de ambiente**:
   ```bash
   cp local.settings.json.example local.settings.json
   ```

3. **Editar `local.settings.json`**:
   ```json
   {
     "Values": {
       "SUPABASE_URL": "https://seu-projeto.supabase.co",
       "SUPABASE_ANON_KEY": "sua-chave-anonima",
       "SUPABASE_TABLE_NAME": "inmetro_database"
     }
   }
   ```

4. **Instalar dependências**:
   ```bash
   cd api
   npm install
   ```

5. **Executar localmente**:
   ```bash
   func start
   ```

   A API estará disponível em: `http://localhost:7071/api/GetCompetitorVehicles`

## 🌐 Deploy no Azure

### Opção 1: Azure Portal

1. Criar um novo Function App no Azure Portal
2. Em "Deployment Center", configurar:
   - Source: GitHub (ou outro provedor Git)
   - Branch: `main` ou `develop`
   - Build provider: GitHub Actions

3. Configurar variáveis de ambiente no Azure Portal:
   - Vá em "Configuration" → "Application settings"
   - Adicione:
     - `SUPABASE_URL`: URL do seu projeto Supabase
     - `SUPABASE_ANON_KEY`: Chave anônima do Supabase
     - `SUPABASE_TABLE_NAME`: `inmetro_database`

### Opção 2: Azure CLI

```bash
# Login
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
cd api
func azure functionapp publish api-volvo-homecharge
```

### Opção 3: GitHub Actions

Use o workflow `.github/workflows/deploy-api.yml` incluído no projeto.

## 🔌 Endpoints

### GET /api/GetCompetitorVehicles

Retorna lista de veículos competidores do Supabase.

**Response 200**:
```json
[
  {
    "marca": "Toyota",
    "modelo": "Corolla",
    "km_l_cidade": 14.5,
    "km_l_estrada": 16.2,
    "tipo_combustivel": "Gasolina"
  }
]
```

**Response 500**:
```json
{
  "error": "Mensagem de erro"
}
```

## 🔒 Segurança

- ✅ Credenciais do Supabase protegidas no backend
- ✅ CORS configurado para permitir requisições do frontend
- ✅ Variáveis de ambiente criptografadas no Azure
- ✅ Autenticação anônima (pode ser alterada para autenticada)

## 🧪 Testar Localmente

```bash
# Terminal 1: Iniciar a função
cd api
func start

# Terminal 2: Testar a API
curl http://localhost:7071/api/GetCompetitorVehicles
```

Ou usar o arquivo `test-api.js` no root do projeto.

## 📝 Notas

- O endpoint está configurado para métodos `GET` e `OPTIONS` (CORS)
- CORS permite qualquer origem (`*`) - ajuste conforme necessário em produção
- Tabela padrão: `inmetro_database`, configurável via `SUPABASE_TABLE_NAME`
- Logs disponíveis no Azure Portal em "Monitor" → "Log stream"

## 🐛 Troubleshooting

**Erro**: "Credenciais do Supabase não configuradas"
- Verifique se as variáveis de ambiente estão configuradas

**Erro**: "Connection refused" ou timeout
- Verifique se o Supabase está acessível
- Verifique se a tabela existe e tem dados

**CORS**: Bloqueio de requisições do frontend
- Verifique se o Azure Function tem CORS configurado
- No Azure Portal: "API" → "CORS" → Adicionar domínio do frontend

## 📚 Recursos

- [Azure Functions Documentation](https://docs.microsoft.com/azure/azure-functions/)
- [Supabase Documentation](https://supabase.com/docs)
- [Node.js Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node)

