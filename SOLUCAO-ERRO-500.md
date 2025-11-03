# 🔧 Solução: Erro 500 no Insomnia

## ✅ Problema Resolvido

O erro 500 era causado por **URL incorreta** no arquivo `local.settings.json`.

### ❌ Antes (INCORRETO):

```json
{
  "SUPABASE_URL": "https://qmcjihjuxjnwlgmzdevl.supabase.co/rest/v1",
  "SUPABASE_TABLE_NAME": "/inmetro_database"
}
```

Isso gerava URL duplicada:
```
https://...supabase.co/rest/v1/rest/v1//inmetro_database
```

### ✅ Agora (CORRETO):

```json
{
  "SUPABASE_URL": "https://qmcjihjuxjnwlgmzdevl.supabase.co",
  "SUPABASE_TABLE_NAME": "inmetro_database"
}
```

Isso gera URL correta:
```
https://...supabase.co/rest/v1/inmetro_database?select=*
```

---

## 🧪 Como Testar Agora

### Opção 1: Script Automático (PowerShell)

```powershell
.\api\test-api.ps1
```

### Opção 2: Teste Manual

**1. Abra um terminal e inicie o backend:**

```powershell
cd api
func start
```

**2. Deixe rodando e abra OUTRO terminal**

**3. Teste no PowerShell:**

```powershell
Invoke-RestMethod -Uri "http://localhost:7071/api/GetCompetitorVehicles" -Method GET
```

**4. Ou teste no Insomnia:**

- **Método**: `GET`
- **URL**: `http://localhost:7071/api/GetCompetitorVehicles`
- **Headers**: Nenhum necessário

### Opção 3: Browser

Abra no navegador: http://localhost:7071/api/GetCompetitorVehicles

---

## 📊 Resposta Esperada

Se tudo estiver correto, você verá um array JSON com veículos:

```json
[
  {
    "marca": "Toyota",
    "modelo": "Corolla",
    "km_l_cidade": 14.5,
    "km_l_estrada": 16.2,
    "tipo_combustivel": "Gasolina"
  },
  {
    "marca": "Volkswagen",
    "modelo": "Golf",
    ...
  }
]
```

---

## 🔍 Se Ainda Der Erro

### 1. Verifique os Logs

No terminal onde está rodando `func start`, você verá:

```
Variáveis de ambiente carregadas:
- SUPABASE_URL: Configurada ✓
- SUPABASE_ANON_KEY: Configurada ✓
- SUPABASE_TABLE_NAME: inmetro_database
URL base: https://qmcjihjuxjnwlgmzdevl.supabase.co
URL completa: https://qmcjihjuxjnwlgmzdevl.supabase.co/rest/v1/inmetro_database?select=*
```

Se aparecer "❌ NÃO CONFIGURADA", há problema no arquivo.

### 2. Verifique se npm install foi executado

```powershell
cd api
npm install
```

### 3. Verifique Node.js

```powershell
node --version
# Deve ser >= 18
```

### 4. Teste Supabase Diretamente

```powershell
Invoke-RestMethod -Uri "https://qmcjihjuxjnwlgmzdevl.supabase.co/rest/v1/inmetro_database?select=*" `
  -Headers @{
    "apikey" = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    "Authorization" = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
```

Se isso funcionar, o problema está no backend.
Se não funcionar, o problema está no Supabase.

---

## 📝 Checklist Final

- [x] ✅ URL corrigida
- [x] ✅ Configuração atualizada
- [x] ✅ Logs melhorados
- [ ] ⏭️ Você: Testar backend
- [ ] ⏭️ Você: Testar no Insomnia
- [ ] ⏭️ Você: Verificar resposta

---

## 🚀 Próximos Passos

Depois que funcionar localmente:

1. **Deploy no Azure** - Ver `api/DEPLOY.md`
2. **Atualizar Frontend** - Usar URL do Azure
3. **Testar Integração** - Frontend → Backend → Supabase

---

**Boa sorte! 🍀**

Se ainda tiver problemas, copie os logs completos do terminal.

