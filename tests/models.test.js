import { beforeAll, beforeEach, afterAll, describe, expect, it } from 'vitest';
import sequelize, { initDB } from '../utilities/db.js';
import { User, Movie, Review, WatchList } from '../models/index.js';

beforeAll(async () => {
  await initDB({ force: true });
});

beforeEach(async () => {
  await sequelize.truncate({ cascade: true, restartIdentity: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('model validation', () => {
  it('validates required user fields and email format', async () => {
    await expect(User.build({}).validate()).rejects.toThrow();
    await expect(User.build({
      name: 'Viewer',
      email: 'not-an-email',
      password: 'hashed-value'
    }).validate()).rejects.toThrow();
    await expect(User.build({
      name: 'Viewer',
      email: 'viewer@example.test',
      password: 'hashed-value'
    }).validate()).resolves.toBeDefined();
  });

  it('defaults users to non-admin', () => {
    const user = User.build({
      name: 'Viewer',
      email: 'viewer@example.test',
      password: 'hashed-value'
    });
    expect(user.isAdmin).toBe(false);
  });

  it('validates required movie fields', async () => {
    await expect(Movie.build({ title: 'Incomplete' }).validate()).rejects.toThrow();
    await expect(Movie.build({
      title: 'Complete',
      releaseYear: 2026,
      genre: 'Drama'
    }).validate()).resolves.toBeDefined();
  });

  it('validates review fields and rating range', async () => {
    await expect(Review.build({
      rating: 6,
      comment: 'Outside range',
      movieId: 1,
      userId: 1
    }).validate()).rejects.toThrow();
    await expect(Review.build({
      rating: 4,
      comment: 'Good',
      movieId: 1,
      userId: 1
    }).validate()).resolves.toBeDefined();
  });

  it('requires both watchlist relationship keys', async () => {
    await expect(WatchList.build({ userId: 1 }).validate()).rejects.toThrow();
    await expect(WatchList.build({ userId: 1, movieId: 1 }).validate()).resolves.toBeDefined();
  });
});
