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

Install dependencies in both the backend and frontend projects:

```bash
cd api && npm install
cd ../client && npm install
```

Start the backend server from the project root:

```bash
npm start
```

Start the React client in a separate terminal:

```bash
cd client
npm start
```

## Environment Variables

Create a `.env` file at the project root with the following variables:

```
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-supabase-service-key>
REACT_APP_API_HOST=<url-where-the-api-runs>
```

`REACT_APP_API_HOST` tells the React client where it can reach the API. The
Supabase variables are used to initialize the client in
`api/db/supabaseClient.js`.

## Testing

The API uses [Jest](https://jestjs.io/) with [Supertest](https://github.com/ladjs/supertest)
for endpoint testing.

From the `api` directory run:

```bash
npm test
```

This will execute all tests under `api/test`.
