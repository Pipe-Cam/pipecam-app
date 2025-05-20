-- Enable pgcrypto for UUID generation
create extension if not exists "pgcrypto";

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  created timestamptz default now(),
  last_modified timestamptz default now(),
  client_type text,
  client_type_other text,
  client_status text,
  client_source text,
  client_source_other text,
  preferred_payment_type text,
  organization_name text,
  organization_phone text,
  organization_address_street text,
  organization_address_unit text,
  organization_address_city text,
  organization_address_state text,
  organization_address_zip text,
  contact_name text,
  contact_phone text,
  contact_email_primary text,
  contact_email_secondary text,
  client_address_street text,
  client_address_unit text,
  client_address_city text,
  client_address_state text,
  client_address_zip text,
  notes jsonb
);
