const supabase = require('./supabaseClient');

async function createNewClient(data) {
  const { data: result, error } = await supabase.from('clients').insert(data).select().single();
  if (error) throw error;
  return result;
}

async function createNewInspection(data) {
  const { data: result, error } = await supabase.from('inspections').insert(data).select().single();
  if (error) throw error;
  return result;
}

async function updateInspection(id, updates) {
  const { data: result, error } = await supabase
    .from('inspections')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return result;
}

async function deleteInspection(id) {
  const { error } = await supabase.from('inspections').delete().eq('id', id);
  if (error) throw error;
}

module.exports = {
  createNewClient,
  createNewInspection,
  updateInspection,
  deleteInspection
};
