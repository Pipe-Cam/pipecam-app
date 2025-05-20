const supabase = require('./supabaseClient');

/* CLIENT HELPERS */
const createNewClient = async (data) => {
  const { error } = await supabase.from('clients').insert(data);
  if (error) console.log(error);
};

const updateClientById = async (id, body) => {
  const { data, error } = await supabase
    .from('clients')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) console.log(error);
  return data;
};

const getClientById = async (id) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) console.log(error);
  return data;
};

const getRecentClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('client_status', 'active')
    .order('last_modified', { ascending: false })
    .limit(10);
  if (error) console.log(error);
  return data;
};

const getArchivedClients = async () => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('client_status', 'archived');
  if (error) console.log(error);
  return data;
};

const searchClients = async (query) => {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .or(`business_name.ilike.%${query}%,contact_name.ilike.%${query}%`);
  if (error) console.log(error);
  return data;
};

const bulkActivateClients = async () => {
  const { error } = await supabase
    .from('clients')
    .update({ client_status: 'active' })
    .eq('client_status', 'Active');
  if (error) console.log(error);
};

const archiveClientById = async (id) => {
  return updateClientById(id, { client_status: 'archived', last_modified: new Date() });
};

/* INSPECTION HELPERS */
const createNewInspection = async (data) => {
  const { error } = await supabase.from('inspections').insert(data);
  if (error) console.log(error);
};

const updateInspectionById = async (id, body) => {
  const { data, error } = await supabase
    .from('inspections')
    .update(body)
    .eq('id', id)
    .select()
    .single();
  if (error) console.log(error);
  return data;
};

const getInspectionById = async (id) => {
  const { data, error } = await supabase
    .from('inspections')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error) console.log(error);
  return data;
};

const getScheduledInspections = async () => {
  const { data, error } = await supabase
    .from('inspections')
    .select('*')
    .eq('status', 'scheduled_inspection')
    .order('overview->inspection_date', { ascending: true })
    .limit(20);
  if (error) console.log(error);
  return data;
};

const getRecentInspections = async () => {
  const { data, error } = await supabase
    .from('inspections')
    .select('*')
    .in('status', ['active_inspection', 'completed_inspection'])
    .order('overview->inspection_date', { ascending: false })
    .limit(20);
  if (error) console.log(error);
  return data;
};

const deleteInspectionById = async (id) => {
  const { error } = await supabase.from('inspections').delete().eq('id', id);
  if (error) console.log(error);
};

module.exports = {
  client: {
    new: createNewClient,
    update: updateClientById,
    getById: getClientById,
    getRecent: getRecentClients,
    getArchived: getArchivedClients,
    search: searchClients,
    bulkActivate: bulkActivateClients,
    archive: archiveClientById
  },
  inspection: {
    new: createNewInspection,
    update: updateInspectionById,
    getById: getInspectionById,
    getScheduled: getScheduledInspections,
    getRecent: getRecentInspections,
    delete: deleteInspectionById
  }
};
