import request from 'supertest';
import app from '../../app.js';

describe('Indications API Tests', function() {
  it('responds with 200 to get all indications', async () => {
    const response = await request(app).get('/api/indications');

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
		expect(response.body.data).toBeInstanceOf(Array);
  });

	it('responds with null if indication id is not found ', async () => {
		const response = await request(app).get('/api/indication/1');

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
		expect(response.body.data).toBe(null);
	});

	it('responds with 201 to insert a new indication', async () => {
		const response = await request(app).post('/api/indication').send({
			year: 2021,
			title: 'Test',
			studios: 'Test Studios',
			producers: 'Test Producer',
			winner: true,
		});

		expect(response.body.status).toBe(201);
		expect(response.body.message).toBe('Indication created successfully');
		expect(response.body.data).toHaveProperty('id');
	});

	it('responds with 200 to update an indication', async () => {
		const indications = await request(app).get('/api/indications');
		const indication = indications.body.data[0];
		const response = await request(app).put(`/api/indication/${indication.id}`).send({
			year: 2021,
			title: 'Test',
			studios: 'Test Studios',
			producers: 'Test Producer',
			winner: true,
		});

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Indication updated successfully');
	});

	it('responds with 200 to remove an indication', async () => {
		const indications = await request(app).get('/api/indications');
		const indication = indications.body.data[0];
		const response = await request(app).delete(`/api/indication/${indication.id}`);

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Indication removed successfully');
	});

	it('responds with 200 to get awards intervals', async () => {
		const response = await request(app).get('/api/indication/awards-intervals');

		expect(response.body.status).toBe(200);
		expect(response.body.message).toBe('Ok');
	});

	it('responds with 404 to a non-existent route', async () => {
		const response = await request(app).get('/api/indications/test');

		expect(response.status).toBe(404);
	});

	it('responds with 400 to a bad request', async () => {
		const response = await request(app).post('/api/indication').send({
			year: 2021,
			title: 'Test',
			studios: 'Test Studios',
			producers: 'T',
		});

		expect(response.status).toBe(400);
		expect(response.body.status).toBe(400);
		expect(response.body.message).toContain('length must be at least 3 characters long');
	});
});
