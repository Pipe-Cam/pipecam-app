# fullstack-boilerplate
[node + express + supabase] backend api & [react] frontend

## Database setup (Supabase)

1. Create or open a project in [Supabase](https://supabase.com/).
2. In the project dashboard, open the **SQL editor**.
3. Run the migration scripts located in `api/db/migrations` in order:
   - `001_create_clients_table.sql`
   - `002_create_inspections_table.sql`
4. After executing the scripts, the `clients` and `inspections` tables will be available in your database.

The scripts use the `pgcrypto` extension so UUID values can be generated via `gen_random_uuid()`.

## Development Setup

Install dependencies using the setup script:

```bash
./.codex/setup.sh
```

Run this once after cloning the repository. It installs packages in the root,
`api`, and `client` directories if their `node_modules` folders are missing.
If the script isn't executable, run `chmod +x .codex/setup.sh` first.

Start the backend server:

```bash
cd api
npm start
```

Start the React client in a separate terminal:

```bash
cd client
npm start
```

## Environment Variables

The API expects the following variables to be available at runtime:

```
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-supabase-service-key>
```
The React client reads `REACT_APP_API_HOST` to determine the API host. If omitted, it defaults to `localhost:5000`.

These values are used to initialize the Supabase client in `api/db/supabaseClient.js`.

## Testing

The API uses [Jest](https://jestjs.io/) with [Supertest](https://github.com/ladjs/supertest)
for endpoint testing.

From the `api` directory run:

```bash
npm test
```

This will execute all tests under `api/test`.

## Environment variables

The API requires credentials for Supabase. Create a `.env` file in the `api`
directory with the following variables:

```bash
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-service-key>
```
