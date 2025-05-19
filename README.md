# fullstack-boilerplate
[node + express + mongo] backend api &amp; [react] frontend

## Environment Variables

The API expects the following variables to be available at runtime:

```
SUPABASE_URL=<your-supabase-project-url>
SUPABASE_KEY=<your-supabase-service-key>
```

These values are used to initialize the Supabase client in `api/db/supabaseClient.js`.
