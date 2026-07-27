import bcrypt from 'bcrypt';
import request from 'supertest';
import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest';
import app from '../app.js';
import sequelize, { initDB } from '../utilities/db.js';
import { User } from '../models/index.js';

beforeAll(async () => {
  await initDB({ force: true });
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});

afterAll(async () => {
  await sequelize.close();
});

async function registerUser(email = 'viewer@example.test') {
  const response = await request(app).post('/api/auth/register').send({
    name: 'Demo Viewer',
    email,
    password: 'demo-password'
  });
  expect(response.status).toBe(201);
  return response;
}

async function createAdmin() {
  const password = 'admin-password';
  const user = await User.create({
    name: 'Admin',
    email: 'admin@example.test',
    password: await bcrypt.hash(password, 4),
    isAdmin: true
  });
  const login = await request(app).post('/api/auth/login').send({
    email: user.email,
    password
  });
  return login.body.token;
}

describe('API integration', () => {
  it('registers, logs in, and returns the current user', async () => {
    const registered = await registerUser();
    expect(registered.body.token).toBeTypeOf('string');
    expect(registered.body.user).toEqual(expect.objectContaining({ name: 'Demo Viewer' }));

    const login = await request(app).post('/api/auth/login').send({
      email: 'viewer@example.test',
      password: 'demo-password'
    });
    expect(login.status).toBe(200);

    const me = await request(app)
      .get('/api/auth/me')
      .set('Authorization', login.body.token);
    expect(me.status).toBe(200);
    expect(me.body.email).toBe('viewer@example.test');
  });

  it('supports movie CRUD for an administrator', async () => {
    const token = await createAdmin();
    const created = await request(app)
      .post('/api/movies')
      .set('Authorization', token)
      .send({ title: 'Offline Cinema', releaseYear: 2026, genre: 'Drama' });
    expect(created.status).toBe(201);

    const listed = await request(app).get('/api/movies');
    expect(listed.status).toBe(200);
    expect(listed.body).toHaveLength(1);

    const updated = await request(app)
      .put(`/api/movies/${created.body.id}`)
      .set('Authorization', token)
      .send({ title: 'Offline Cinema Redux', releaseYear: 2026, genre: 'Drama' });
    expect(updated.status).toBe(200);

    const fetched = await request(app).get(`/api/movies/${created.body.id}`);
    expect(fetched.body.title).toBe('Offline Cinema Redux');

    const deleted = await request(app)
      .delete(`/api/movies/${created.body.id}`)
      .set('Authorization', token);
    expect(deleted.status).toBe(200);
  });

  it('supports review and watchlist flows for a user', async () => {
    const adminToken = await createAdmin();
    const movie = await request(app)
      .post('/api/movies')
      .set('Authorization', adminToken)
      .send({ title: 'Reviewable Film', releaseYear: 2025, genre: 'Documentary' });
    const registered = await registerUser('critic@example.test');
    const token = registered.body.token;

    const review = await request(app)
      .post(`/api/reviews/${movie.body.id}`)
      .set('Authorization', token)
      .send({ rating: 5, comment: 'Excellent offline demo.' });
    expect(review.status).toBe(201);

    const reviews = await request(app).get(`/api/reviews/${movie.body.id}`);
    expect(reviews.status).toBe(200);
    expect(reviews.body).toHaveLength(1);

    const updated = await request(app)
      .put(`/api/reviews/${movie.body.id}`)
      .set('Authorization', token)
      .send({ rating: 4, comment: 'Still excellent.' });
    expect(updated.status).toBe(200);

    const added = await request(app)
      .post(`/api/watchlist/${movie.body.id}`)
      .set('Authorization', token);
    expect(added.status).toBe(201);

    const watchlist = await request(app)
      .get('/api/watchlist')
      .set('Authorization', token);
    expect(watchlist.status).toBe(200);
    expect(watchlist.body).toHaveLength(1);

    const removed = await request(app)
      .delete(`/api/watchlist/${movie.body.id}`)
      .set('Authorization', token);
    expect(removed.status).toBe(200);
  });

  it('serves a route-derived OpenAPI document and explorer', async () => {
    const spec = await request(app).get('/api-docs.json');
    expect(spec.status).toBe(200);
    expect(spec.body.paths).toHaveProperty('/api/movies');
    expect(spec.body.paths).toHaveProperty('/api/auth/register');
    expect(spec.body.paths).toHaveProperty('/api/watchlist/{movieId}');

    const explorer = await request(app).get('/api-docs/');
    expect(explorer.status).toBe(200);
    expect(explorer.text).toContain('Movies API Explorer');
  });
});
