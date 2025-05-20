let createClient;
try {
  ({ createClient } = require('@supabase/supabase-js'));
} catch (err) {
  createClient = () => ({
    from() {
      const chain = {
        insert: async () => ({ data: null, error: new Error('supabase stub') }),
        select: async () => ({ data: null, error: new Error('supabase stub') }),
        update: async () => ({ data: null, error: new Error('supabase stub') }),
        delete: async () => ({ data: null, error: new Error('supabase stub') }),
        eq() { return chain; },
        in() { return chain; },
        order() { return chain; },
        limit() { return chain; },
        single() { return chain; },
        maybeSingle() { return chain; }
      };
      return chain;
    }
  });
}

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
