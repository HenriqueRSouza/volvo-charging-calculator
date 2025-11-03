# ⚡ Quick Start Guide

Guia rápido para começar a usar a API backend em 5 minutos.

## 📦 Setup Rápido

### 1. Instalar Ferramentas

```bash
# Node.js 18+ (já instalado?)
node --version

# Azure Functions Core Tools
npm install -g azure-functions-core-tools@4 --unsafe-perm true

# Verificar instalação
func --version
```

### 2. Configurar Projeto

```bash
cd api

# Instalar dependências
npm install

# Criar configuração local
cp local.settings.json.example local.settings.json
```

### 3. Adicionar Credenciais

Edite `local.settings.json`:

```json
{
  "Values": {
    "SUPABASE_URL": "https://SEU-PROJETO.supabase.co",
    "SUPABASE_ANON_KEY": "sua-chave-aqui",
    "SUPABASE_TABLE_NAME": "inmetro_database"
  }
}
```

**Onde obter?**
1. https://supabase.com → Projeto → Settings → API
2. Copie "Project URL" → `SUPABASE_URL`
3. Copie "anon public" → `SUPABASE_ANON_KEY`

### 4. Rodar Localmente

```bash
func start
```

API disponível em: `http://localhost:7071/api/GetCompetitorVehicles`

### 5. Testar

```bash
curl http://localhost:7071/api/GetCompetitorVehicles
```

Ou abra no navegador: http://localhost:7071/api/GetCompetitorVehicles

## ✅ Pronto!

Sua API está rodando localmente.

**Próximos passos:**
- 📖 [Documentação completa](README.md)
- 🚀 [Guia de deploy](DEPLOY.md)
- 💻 [Desenvolvimento](DEVELOPMENT.md)

## 🆘 Problemas Comuns

### "func: command not found"
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### "Credenciais não configuradas"
- Verifique se `local.settings.json` existe
- Confirme que as variáveis estão corretas
- Reinicie: `func start`

### Porta 7071 em uso
```bash
func start --port 7072
```

## 📞 Suporte

Consulte:
- [README.md](README.md) - Documentação geral
- [DEVELOPMENT.md](DEVELOPMENT.md) - Guia de desenvolvimento
- [DEPLOY.md](DEPLOY.md) - Deploy no Azure
- [ENV_VARIABLES.md](ENV_VARIABLES.md) - Variáveis de ambiente

---

**🎉 Boa sorte!**

