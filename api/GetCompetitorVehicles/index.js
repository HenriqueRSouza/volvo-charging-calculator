//Api conection
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") }); // <-- carrega o .env da pasta atual
const { createClient } = require("@supabase/supabase-js");

module.exports = async function (context, req) {
  // Inicializa o cliente Supabase com variáveis de ambiente
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  // Cabeçalhos CORS
  const headers = {
    "Access-Control-Allow-Origin": "*", // ajuste para seu domínio em produção
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Responde rapidamente a requisições OPTIONS (CORS preflight)
  if (req.method === "OPTIONS") {
    context.res = {
      status: 204,
      headers,
    };
    return;
  }

  try {
    if (req.method === "GET") {
      // Busca todos os registros
      const { data, error } = await supabase
        .from("inmetro_database")
        .select("*");

      if (error) throw error;

      context.res = {
        status: 200,
        headers,
        body: data,
      };

    } else if (req.method === "POST") {
      // Valida o corpo da requisição
      const { nome, valor } = req.body || {};

      if (!nome || valor === undefined) {
        context.res = {
          status: 400,
          headers,
          body: { error: "Campos 'nome' e 'valor' são obrigatórios." },
        };
        return;
      }

      // Insere novo registro
      const { data, error } = await supabase
        .from("inmetro_database")
        .insert([{ nome, valor }])
        .select();

      if (error) throw error;

      context.res = {
        status: 201,
        headers,
        body: data,
      };

    } else {
      context.res = {
        status: 405,
        headers,
        body: { error: "Method Not Allowed" },
      };
    }
  } catch (err) {
    context.res = {
      status: 500,
      headers,
      body: { error: err.message },
    };
  }
};
