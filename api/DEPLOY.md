# Guia Completo de Deploy - Azure

Este guia cobre o deploy completo da aplicação Volvo Home Charge no Azure.

## 📋 Pré-requisitos

- [x] Conta Azure com subscrição ativa
- [x] Node.js 18+ instalado
- [x] Azure CLI instalado
- [x] Azure Functions Core Tools v4
- [x] Supabase configurado com dados

## 🎯 Objetivo

Deploy de:
1. **Backend**: Azure Functions (API proxy)
2. **Frontend**: Azure Static Web Apps (React App)

## 📝 Passo a Passo

### 1. Preparação

```bash
# Login no Azure
az login

# Verificar subscrição
az account show

# Definir subscrição padrão (se necessário)
az account set --subscription "Nome-da-Subscrição"
```

### 2. Criar Resource Group

```bash
az group create \
  --name rg-volvo-homecharge \
  --location eastus
```

**Locations recomendadas**: `eastus`, `westus2`, `brazilsouth` (Brasil)

### 3. Criar Storage Account

```bash
az storage account create \
  --name storagevolvohomecharge$(date +%s) \
  --resource-group rg-volvo-homecharge \
  --location eastus \
  --sku Standard_LRS
```

> ⚠️ **Nota**: Storage account name deve ser único globalmente (usado timestamp)

### 4. Deploy Backend (Azure Functions)

#### 4.1 Criar Function App

```bash
az functionapp create \
  --resource-group rg-volvo-homecharge \
  --consumption-plan-location eastus \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name api-volvo-homecharge-$(date +%s) \
  --storage-account $(az storage account list --resource-group rg-volvo-homecharge --query "[0].name" -o tsv)
```

#### 4.2 Configurar Variáveis de Ambiente

```bash
# Substitua pelos seus valores
az functionapp config appsettings set \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --settings \
    SUPABASE_URL="https://xxxxx.supabase.co" \
    SUPABASE_ANON_KEY="eyJhbGciOi..." \
    SUPABASE_TABLE_NAME="inmetro_database"
```

#### 4.3 Configurar CORS

```bash
az functionapp cors add \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --allowed-origins "*"
```

> ⚠️ Em produção, substitua `"*"` pelo domínio específico do frontend

#### 4.4 Deploy da Função

```bash
cd api

# Login
func azure login

# Deploy
func azure functionapp publish SEU-FUNCTION-APP-NAME
```

**Alternativa via CLI**:
```bash
az functionapp deployment source config-zip \
  --resource-group rg-volvo-homecharge \
  --name SEU-FUNCTION-APP-NAME \
  --src api.zip
```

#### 4.5 Testar Backend

```bash
# Obter URL
FUNCTION_URL=$(az functionapp show \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --query defaultHostName -o tsv)

# Testar
curl https://${FUNCTION_URL}/api/GetCompetitorVehicles
```

### 5. Deploy Frontend (Azure Static Web Apps)

#### 5.1 Criar Static Web App

```bash
az staticwebapp create \
  --name swa-volvo-homecharge \
  --resource-group rg-volvo-homecharge \
  --sku Standard \
  --app-location "/" \
  --api-location "" \
  --output-location "dist"
```

#### 5.2 Conectar ao GitHub

No Azure Portal:
1. Abra o Static Web App
2. Clique em "Deployment"
3. Clique em "Manage deployment token"
4. Copie o token
5. Adicione como secret no GitHub: `AZURE_STATIC_WEB_APPS_API_TOKEN`

#### 5.3 Configurar Build

Crie `.github/workflows/deploy-frontend.yml`:

```yaml
name: Deploy Frontend to Azure Static Web Apps

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BACKEND_URL: ${{ secrets.VITE_API_BACKEND_URL }}
      
      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "/"
          output_location: "dist"
```

#### 5.4 Configurar Variáveis de Ambiente

No GitHub Repository → Settings → Secrets:

Adicione:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`: Token obtido no portal
- `VITE_API_BACKEND_URL`: `https://api-volvo-homecharge-xxxxx.azurewebsites.net/api`

**Alternativa via Portal**:
1. Azure Portal → Static Web App → Configuration
2. Adicione: `VITE_API_BACKEND_URL`

### 6. Verificar Deployment

```bash
# Frontend URL
az staticwebapp show \
  --name swa-volvo-homecharge \
  --resource-group rg-volvo-homecharge \
  --query defaultHostname -o tsv

# Backend URL
az functionapp show \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --query defaultHostName -o tsv
```

## 🔒 Segurança Pós-Deploy

### 1. Restringir CORS

```bash
az functionapp cors remove \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --allowed-origins "*"

az functionapp cors add \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --allowed-origins "https://swa-volvo-homecharge.azurestaticapps.net"
```

### 2. Habilitar HTTPS Only

```bash
# Function App
az functionapp update \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --set httpsOnly=true

# Static Web App (já habilitado por padrão)
```

### 3. Configurar Logs

```bash
# Criar Application Insights
az monitor app-insights component create \
  --app appi-volvo-homecharge \
  --location eastus \
  --resource-group rg-volvo-homecharge

# Associar ao Function App
az functionapp config appsettings set \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge \
  --settings \
    APPINSIGHTS_INSTRUMENTATIONKEY="$(az monitor app-insights component show --app appi-volvo-homecharge --resource-group rg-volvo-homecharge --query instrumentationKey -o tsv)"
```

## 📊 Monitoramento

### Logs em Tempo Real

```bash
# Backend
func azure functionapp logstream SEU-FUNCTION-APP-NAME

# Ou via Portal
az functionapp log tail --name SEU-FUNCTION-APP-NAME --resource-group rg-volvo-homecharge
```

### Métricas

Monitorar em:
- Azure Portal → Function App → Metrics
- Azure Portal → Static Web App → Metrics

## 🔄 Update de Deployment

```bash
# Backend
cd api
func azure functionapp publish SEU-FUNCTION-APP-NAME

# Frontend
git push origin main
# GitHub Actions fará o deploy automaticamente
```

## 💰 Estimativa de Custos

Azure Consumption Plan:
- **Function App**: ~USD 0 - 5/mês (execuções gratuitas)
- **Static Web App**: Gratuito para uso moderado
- **Storage**: ~USD 1/mês
- **Application Insights**: Gratuito até 5GB/mês

**Total estimado**: ~USD 1-6/mês

## 🗑️ Cleanup (Remover tudo)

```bash
# Remover resource group (deleta tudo)
az group delete --name rg-volvo-homecharge --yes --no-wait
```

## 🐛 Troubleshooting

### Backend não responde

```bash
# Verificar logs
func azure functionapp logstream SEU-FUNCTION-APP-NAME

# Verificar configurações
az functionapp config appsettings list \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge
```

### CORS errors no frontend

```bash
# Listar origens permitidas
az functionapp cors show \
  --name SEU-FUNCTION-APP-NAME \
  --resource-group rg-volvo-homecharge
```

### Cold start lento

- Primeira execução após inatividade pode levar 5-10s
- Considere Premium plan se necessário
- Implementar keep-alive ping opcional

## 📚 Links Úteis

- [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions/)
- [Static Web Apps Docs](https://docs.microsoft.com/azure/static-web-apps/)
- [Azure CLI Reference](https://docs.microsoft.com/cli/azure/)
- [Supabase Pricing](https://supabase.com/pricing)

## ✅ Checklist Final

- [ ] Resource Group criado
- [ ] Storage Account criado
- [ ] Function App criado e configurado
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado
- [ ] Backend deployado e testado
- [ ] Static Web App criado
- [ ] GitHub Actions configurado
- [ ] Frontend deployado e testado
- [ ] HTTPS verificado
- [ ] Logs configurados
- [ ] Monitoramento ativo

---

**Próximo passo**: Testar integração completa em produção! 🚀

