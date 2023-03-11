const request = require('supertest');
const app = require('../../../server');

describe('GET /uploads', () => {
  it('Get all file uploaded', async () => {
    const response = await request(app).get('/api/v1/uploads');

    expect(response.statusCode(200));
  });
});
