// API connection - versão sem .env
const { createClient } = require("@supabase/supabase-js");

module.exports = async function (context, req) {
  // 🔧 Substitua pelos seus valores reais:
  const SUPABASE_URL = "https://qmcjihjuxjnwlgmzdevl.supabase.co/rest/v1";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtY2ppaGp1eGpud2xnbXpkZXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTA3NTQsImV4cCI6MjA2ODg2Njc1NH0.DVl9uph4wQUpL4Dvo2980Y-uYWc7m9dkw2K8bLAdPtU"; // sua anon key
  
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exemplo de rota GET para buscar dados do Supabase
app.get("/api/clientes", async (req, res) => {
  try {
    if (req.method === "GET") {
      // Busca todos os registros
      const { data, error } = await supabase.from("inmetro_database").select("*");
      if (error) throw error;
      context.res = { status: 200, body: data };
    } 
    else if (req.method === "POST") {
      // Insere um registro (nome e valor)
      const { nome, valor } = req.body;
      const { data, error } = await supabase
        .from("inmetro_database")
        .insert([{ nome, valor }])
        .select();
      if (error) throw error;
      context.res = { status: 201, body: data };
    } 
    else {
      // Método não permitido
      context.res = { status: 405, body: "Method Not Allowed" };
    }
  } catch (error) {
    // Tratamento de erro
    context.log("Erro na função:", error.message);
    context.res = { status: 500, body: { error: error.message } };
  }
});

// Exemplo de rota POST para inserir dados
app.post("/api/clientes", async (req, res) => {
  try {
    const { nome, email } = req.body;
    const { data, error } = await supabase
      .from("inmetro_database")
      .insert([{ nome, email }])
      .select();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Erro ao inserir:", err.message);
    res.status(500).json({ erro: err.message });
  }
};
