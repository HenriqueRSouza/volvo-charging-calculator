# Variáveis de Ambiente

## 🔐 Backend API (Azure Functions)

Configure no Azure Portal → Configuration → Application settings:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `SUPABASE_URL` | URL do projeto Supabase | `https://xxxxxxxxxxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | Chave anônima do Supabase | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `SUPABASE_TABLE_NAME` | Nome da tabela (opcional) | `inmetro_database` |

### Como obter credenciais do Supabase:

1. Acesse: https://supabase.com
2. Selecione seu projeto
3. Vá em "Settings" → "API"
4. Copie:
   - **Project URL** → `SUPABASE_URL`
   - **anon public key** → `SUPABASE_ANON_KEY`

### Para desenvolvimento local:

Crie `api/local.settings.json`:
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

## 🌐 Frontend

Configure no arquivo `.env` (na raiz do projeto):

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `VITE_API_BACKEND_URL` | URL da Azure Function | `http://localhost:7071/api` (dev) ou `https://api-volvo-homecharge.azurewebsites.net/api` (prod) |

### Para desenvolvimento local:

Crie `.env` na raiz:
```env
VITE_API_BACKEND_URL=http://localhost:7071/api
```

### Para produção (Azure Static Web Apps):

Configure no Azure Portal → Configuration → Application settings.

## 🔒 Segurança

- ✅ Backend protege credenciais do Supabase
- ❌ **NUNCA** exponha credenciais no frontend
- ✅ Use variáveis de ambiente para diferentes ambientes
- ✅ `local.settings.json` e `.env` devem estar no `.gitignore`

## 📝 Checklist de Deploy

- [ ] Backend: Configurar `SUPABASE_URL` no Azure
- [ ] Backend: Configurar `SUPABASE_ANON_KEY` no Azure  
- [ ] Frontend: Configurar `VITE_API_BACKEND_URL` no Azure
- [ ] Testar API localmente
- [ ] Testar integração frontend → backend
- [ ] Deploy do backend no Azure
- [ ] Deploy do frontend no Azure
- [ ] Testar em produção

