# fullstack-boilerplate
[node + express + Supabase] backend api & [react] frontend

## Database setup (Supabase)

1. Create or open a project in [Supabase](https://supabase.com/).
2. In the project dashboard, open the **SQL editor**.
3. Run the migration scripts located in `api/db/migrations` in order:
   - `001_create_clients_table.sql`
   - `002_create_inspections_table.sql`
4. After executing the scripts, the `clients` and `inspections` tables will be available in your database.

The scripts use the `pgcrypto` extension so UUID values can be generated via `gen_random_uuid()`.

## Development Setup

Install dependencies in both the backend and frontend projects:

```bash
cd api && npm install
cd ../client && npm install
```

Start the backend server:

```bash
cd api
npm start
```

Start the React client in a separate terminal:

```bash
cd client
npm start
