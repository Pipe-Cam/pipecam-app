# fullstack-boilerplate
[node + express + Supabase] backend api &amp; [react] frontend

## Testing

The API uses [Jest](https://jestjs.io/) with [Supertest](https://github.com/ladjs/supertest)
for endpoint testing.

From the `api` directory run:

```bash
npm test
```

This will execute all tests under `api/test`.

## Database Setup

SQL migrations are located under `api/db/migrations`. To create the tables in your Supabase project:

1. Sign in to the [Supabase dashboard](https://app.supabase.com) and open your project.
2. Navigate to **SQL Editor** and create a new query.
3. Copy the contents of each migration file (for example `001_create_clients.sql` and `002_create_inspections.sql`) into the editor and run the query.

Alternatively, if you have the `supabase` CLI configured locally and your database URL set, you can execute:

```bash
psql "$SUPABASE_DB_URL" -f api/db/migrations/001_create_clients.sql
psql "$SUPABASE_DB_URL" -f api/db/migrations/002_create_inspections.sql
```

This will create the `clients` and `inspections` tables in your Supabase database.
