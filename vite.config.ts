import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  // 🔹 Carrega variáveis de ambiente do sistema e do .env.*
  const env = loadEnv(mode, process.cwd(), "");
// Para Azure Static Web Apps, as variáveis de ambiente são injetadas automaticamente durante o build

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // 🔹 Injeta as variáveis no build
      "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
      "import.meta.env.VITE_API_KEY": JSON.stringify(env.VITE_API_KEY),
      "import.meta.env.VITE_API_BACKEND_URL": JSON.stringify(env.VITE_API_BACKEND_URL),
      "import.meta.env.VITE_SUPABASE_URL": JSON.stringify(env.VITE_SUPABASE_URL),
      "import.meta.env.VITE_SUPABASE_ANON_KEY": JSON.stringify(env.VITE_SUPABASE_ANON_KEY),
    },
  };
});
