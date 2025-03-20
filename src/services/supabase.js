import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://apexcdxjaacqbkiaiehc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZXhjZHhqYWFjcWJraWFpZWhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5MTM5NzAsImV4cCI6MjA1NDQ4OTk3MH0.FwwpRcpYbtzZ0huSffl9wQ2qeJNbQG3rq2ptQpaTT94";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
