import express from 'express';
import * as reviewsController from '../controllers/reviews.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validator.middleware.js';
import { createOrUpdateReviewValidator } from '../validators/review.validators.js';

const router = express.Router();

/**
 * @openapi
 * /api/reviews/{movieId}:
 *   post:
 *     tags: [Reviews]
 *     summary: Review a movie
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReviewInput' }
 *     responses:
 *       201: { description: Review created }
 */
router.post('/:movieId',
    authenticateUser,
    createOrUpdateReviewValidator,
    validateRequest,
    asyncHandler(reviewsController.createReview)
);

/**
 * @openapi
 * /api/reviews/{movieId}:
 *   put:
 *     tags: [Reviews]
 *     summary: Update the current user's review
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReviewInput' }
 *     responses:
 *       200: { description: Review updated }
 *       404: { description: Review not found }
 */
router.put('/:movieId',
    authenticateUser,
    createOrUpdateReviewValidator,
    validateRequest,
    asyncHandler(reviewsController.updateReview)
);

/**
 * @openapi
 * /api/reviews/{movieId}:
 *   get:
 *     tags: [Reviews]
 *     summary: List reviews for a movie
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Reviews with user and movie summaries
 */
router.get('/:movieId',
    asyncHandler(reviewsController.getReviewsByMovieId)
);

export default router;
