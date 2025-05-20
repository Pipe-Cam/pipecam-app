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

## Environment variables

The API requires credentials for Supabase. Create a `.env` file in the `api`
directory with the following variables:

```bash
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-service-key>
```
