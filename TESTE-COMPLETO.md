# 🧪 Teste Completo - Backend + Frontend

## ✅ Configuração Concluída

### O que foi configurado:

1. ✅ **Backend Express** em `api/server.js`
2. ✅ **Frontend** atualizado para consumir `http://localhost:5000/api/dados`
3. ✅ **CORS** configurado no backend
4. ✅ **Supabase** conectado

---

## 🚀 Testar Agora

### Passo 1: Criar arquivo `.env` no backend

Crie manualmente o arquivo `api/.env` com:

```env
SUPABASE_URL=https://qmcjihjuxjnwlgmzdevl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtY2ppaGp1eGpud2xnbXpkZXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTA3NTQsImV4cCI6MjA2ODg2Njc1NH0.DVl9uph4wQUpL4Dvo2980Y-uYWc7m9dkw2K8bLAdPtU
PORT=5000
```

### Passo 2: Instalar dependências do backend

```powershell
cd api
npm install
```

### Passo 3: Iniciar Backend

```powershell
cd api
npm start
```

**Aguarde ver:** `✅ Servidor rodando em http://localhost:5000`

### Passo 4: Testar Backend

Em **outro terminal**:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/dados" -Method GET
```

**Deve retornar** array com veículos do Supabase.

### Passo 5: Iniciar Frontend

Em **outro terminal**:

```powershell
npm run dev
```

**Abra:** http://localhost:8080

### Passo 6: Testar Frontend

1. Na aplicação, vá até "Escolha o veículo que deseja comparar"
2. Deve carregar a lista de veículos do Supabase
3. Verifique o console do navegador para logs

---

## 📊 Verificação

### No Console do Browser (F12):

Você deve ver:
```
🔗 Buscando dados da API backend...
URL: http://localhost:5000/api/dados
📦 Dados recebidos da API: [...]
✅ Dados processados: [...]
```

---

## 🐛 Troubleshooting

### Backend não inicia
- Verifique se criou `api/.env`
- Execute `cd api && npm install`

### Frontend não conecta
- Verifique se backend está rodando na porta 5000
- Verifique console do navegador (F12)

### Erro CORS
- O backend já tem CORS configurado
- Se persistir, verifique `api/server.js`

---

## ✅ Checklist

- [ ] Arquivo `api/.env` criado
- [ ] Backend rodando (`npm start` em api/)
- [ ] Teste backend OK (`curl localhost:5000/api/dados`)
- [ ] Frontend rodando (`npm run dev`)
- [ ] Lista de veículos carregando

---

**Tudo pronto! 🎉**

