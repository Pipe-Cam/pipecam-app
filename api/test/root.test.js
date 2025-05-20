const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
<<<<<<< HEAD
  it('responds with 200 and expected text', async () => {
=======
  it('responds with expected text', async () => {
>>>>>>> origin/codex/add-jest-and-supertest-for-api-tests
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hey! Quit snooping. Go away and mind your own business!');
  });
});
