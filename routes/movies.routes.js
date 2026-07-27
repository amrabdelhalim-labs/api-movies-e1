import express from 'express';
import * as moviesController from '../controllers/movies.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { authenticateAdmin } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validator.middleware.js';
import { createOrUpdateMovieValidator } from '../validators/movie.validators.js';

const router = express.Router();

/**
 * @openapi
 * /api/movies:
 *   get:
 *     tags: [Movies]
 *     summary: List all movies
 *     responses:
 *       200:
 *         description: Movie list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Movie' }
 */
router.get('/',
    asyncHandler(moviesController.getAllMovies)
);

/**
 * @openapi
 * /api/movies/{id}:
 *   get:
 *     tags: [Movies]
 *     summary: Get one movie
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Movie details
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Movie' }
 *       404:
 *         description: Movie not found
 */
router.get('/:id',
    asyncHandler(moviesController.getMovieById)
);

/**
 * @openapi
 * /api/movies:
 *   post:
 *     tags: [Movies]
 *     summary: Create a movie (admin only)
 *     security: [{ tokenAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/MovieInput' }
 *     responses:
 *       201: { description: Movie created }
 *       403: { description: Admin access required }
 */
router.post('/',
    authenticateUser,
    createOrUpdateMovieValidator,
    validateRequest,
    asyncHandler(authenticateAdmin),
    asyncHandler(moviesController.createMovie)
);

/**
 * @openapi
 * /api/movies/{id}:
 *   put:
 *     tags: [Movies]
 *     summary: Update a movie (admin only)
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/MovieInput' }
 *     responses:
 *       200: { description: Movie updated }
 *       404: { description: Movie not found }
 */
router.put('/:id',
    authenticateUser,
    asyncHandler(authenticateAdmin),
    createOrUpdateMovieValidator,
    validateRequest,
    asyncHandler(moviesController.updateMovie)
);

/**
 * @openapi
 * /api/movies/{id}:
 *   delete:
 *     tags: [Movies]
 *     summary: Delete a movie (admin only)
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Movie deleted }
 *       404: { description: Movie not found }
 */
router.delete('/:id',
    authenticateUser,
    asyncHandler(authenticateAdmin),
    asyncHandler(moviesController.deleteMovie)
);

export default router;
