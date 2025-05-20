const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase environment variables are not set');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signIn(email, password) {
  return supabase.auth.signInWithPassword({ email, password });
}

async function signUp(email, password) {
  return supabase.auth.signUp({ email, password });
}

async function getSession(accessToken) {
  return supabase.auth.getUser(accessToken);
}

module.exports = { supabase, signIn, signUp, getSession };
