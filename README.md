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

## Environment Variables

The API requires the following variables to connect to Supabase:

```bash
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-service-role-key>
```
