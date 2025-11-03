# ✅ Configuração Final - Backend Express + Frontend

## 🎉 Backend e Frontend Conectados!

### 📁 Estrutura Final

```
TRATAMENTO HOME-CHARGE/
├── api/
│   ├── server.js              # Backend Express
│   ├── package.json
│   ├── .env                   # Credenciais Supabase (local)
│   └── node_modules/
└── src/
    └── data/
        └── competitorVehicles.ts  # Frontend consumindo API
```

---

## 🚀 Como Usar

### 1. Iniciar Backend

```powershell
cd api
npm start
```

Você verá:
```
✅ Servidor rodando em http://localhost:5000
```

### 2. Iniciar Frontend

Em **outro terminal**:

```powershell
npm run dev
```

Frontend rodando em: `http://localhost:8080`

---

## ✅ URLs Configuradas

### Backend (Express)
- **URL**: `http://localhost:5000`
- **Endpoint**: `GET /api/dados`
- **Porta**: 5000

### Frontend (React)
- **URL**: `http://localhost:8080`
- **API**: Busca em `http://localhost:5000/api/dados`

---

## 🔧 Variáveis de Ambiente

### Backend (`api/.env`)
```env
SUPABASE_URL=https://qmcjihjuxjnwlgmzdevl.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
PORT=5000
```

### Frontend (`.env` - opcional)
```env
VITE_API_BACKEND_URL=http://localhost:5000
```

**Nota**: Se não definir `VITE_API_BACKEND_URL`, o frontend usa `http://localhost:5000` por padrão.

---

## 🧪 Testar

### 1. Backend
```powershell
curl http://localhost:5000/api/dados
```

### 2. Frontend
1. Abra: http://localhost:8080
2. Vá até "Escolha o veículo que deseja comparar"
3. Deve carregar a lista de veículos do Supabase

---

## 📊 Fluxo de Dados

```
Frontend (React) → GET /api/dados → Backend Express → Supabase → Dados
   :8080                              :5000             Database
```

---

## 🔒 Segurança

- ✅ Credenciais do Supabase protegidas no backend
- ✅ Frontend não tem acesso às credenciais
- ✅ CORS configurado no Express
- ✅ `.env` não é commitado (no .gitignore)

---

## 📝 Próximos Passos

### Para Produção (Azure)

1. Deploy do backend no Azure App Service
2. Deploy do frontend no Azure Static Web Apps
3. Configurar variáveis de ambiente no Azure
4. Atualizar `VITE_API_BACKEND_URL` com URL do Azure

---

**Tudo funcionando! 🎉**

