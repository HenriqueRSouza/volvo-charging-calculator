// backend/supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = 'https://qmcjihjuxjnwlgmzdevl.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtY2ppaGp1eGpud2xnbXpkZXZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTA3NTQsImV4cCI6MjA2ODg2Njc1NH0.DVl9uph4wQUpL4Dvo2980Y-uYWc7m9dkw2K8bLAdPtU';

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error("Variáveis SUPABASE_URL e SUPABASE_KEY não configuradas!");
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
