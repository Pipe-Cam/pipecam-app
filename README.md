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

## Testing

The API uses [Jest](https://jestjs.io/) with [Supertest](https://github.com/ladjs/supertest)
for endpoint testing.

From the `api` directory run:

```bash
npm test
```

This will execute all tests under `api/test`.
