const request = require('supertest');
const app = require('../app');

// Expose a preconfigured request instance globally
global.request = request(app);
