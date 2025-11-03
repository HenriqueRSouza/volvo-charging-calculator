import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Cria o cliente Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// Exemplo de rota: retorna todos os registros de uma tabela
app.get("/api/dados", async (req, res) => {
    try {
        const { data, error } = await supabase.from("inmetro_database").select("*");

        if (error) throw error;
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Exemplo de rota para inserir dado
app.post("/api/dados", async (req, res) => {
    try {
        const { nome, valor } = req.body;

        const { data, error } = await supabase
            .from("inmetro_database")
            .insert([{ nome, valor }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
