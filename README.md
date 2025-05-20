# fullstack-boilerplate
[node + express + mongo] backend api & [react] frontend

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
```

## Environment Variables

The API expects the following variables to be available at runtime:

```
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-supabase-service-key>
```

These values are used to initialize the Supabase client in `api/db/supabaseClient.js`.

## Testing

The API uses [Jest](https://jestjs.io/) with [Supertest](https://github.com/ladjs/supertest)
for endpoint testing.

From the `api` directory run:

```bash
npm test
```

This will execute all tests under `api/test`.
