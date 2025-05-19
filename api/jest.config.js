module.exports = {
  testEnvironment: 'node',
  // Load Supertest request helper before running tests
  setupFilesAfterEnv: ['<rootDir>/test/setup.js']
};
