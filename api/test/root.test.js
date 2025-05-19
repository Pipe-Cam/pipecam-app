// `request` is provided by the Jest setup file


describe('GET /', () => {
  it('responds with expected text', async () => {
    const res = await request.get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hey! Quit snooping. Go away and mind your own business!');
  });
});
