import request from 'supertest';
import app from '../../app.js';
const jwt = require('jsonwebtoken');

describe('Indications API Tests', function() {
	let token;

  beforeAll(async () => {
    token = jwt.sign({ name: 'userExample' }, process.env.SECRET, { expiresIn: '1h' });
		await new Promise((r) => setTimeout(r, 1000));
  });

	it('Should return 401 when token is not provided', async () => {
		const response = await request(app).get('/api/indications');
		expect(response.status).toBe(401);
		expect(response.text).toBe('Unauthorized');
	});

	it('Should return 401 when token is invalid', async () => {
		const response = await request(app).get('/api/indications').set({ "authorization":'invalidtoken' });
		expect(response.status).toBe(401);
		expect(response.body.status).toBe(401);
		expect(response.body.message).toBe('jwt malformed');
	});

  it('responds with 200 to get all indications', async () => {
    const response = await request(app).get('/api/indications').set({ "authorization":token });
		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
		expect(response.body.data).toBeInstanceOf(Array);
		expect(response.body.data.length).toBe(206);
  });

	it('responds with null if indication id is not found ', async () => {
		const response = await request(app).get('/api/indication/1').set({ "authorization":token });

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
		expect(response.body.data).toBe(null);
	});

	it('responds with 200 to remove an indication', async () => {
		const indications = await request(app).get('/api/indications').set({ "authorization":token });
		const indication = indications.body.data[0];
		const response = await request(app).delete(`/api/indication/${indication.id}`).set({ "authorization":token });

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Indication removed successfully');
	});

	it('responds with 200 to get awards intervals', async () => {
		const response = await request(app).get('/api/indication/awards-intervals').set({ "authorization":token });;

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
	});

	it('responds with 404 to a non-existent route', async () => {
		const response = await request(app).get('/api/indications/test').set({ "authorization":token });;

		expect(response.status).toBe(404);
	});

	it('responds with 400 to a bad request', async () => {
		const response = await request(app).post('/api/indication').send({
			year: 2021,
			title: 'Test',
			studios: 'Test Studios',
			producers: 'T',
			winner: true,
		}).set({ "authorization":token });

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(400);
		expect(response.body.message).toContain('length must be at least 3 characters long');
	});

	it('Should return with min and max producer awards intervals', async () => {
		const response = await request(app).get('/api/indications/awards-intervals').set({ "authorization":token });

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
		expect(response.body.data.min).toBeInstanceOf(Array);
		expect(response.body.data.max).toBeInstanceOf(Array);
		expect(response.body.data.min.length).toBe(1);
		expect(response.body.data.min[0].interval).toBe(1);
		expect(response.body.data.min[0].producer).toBe('Joel Silver');
		expect(response.body.data.max.length).toBe(1);
		expect(response.body.data.max[0].producer).toBe('Matthew Vaughn');
		expect(response.body.data.max[0].interval).toBe(13);
	});
});
