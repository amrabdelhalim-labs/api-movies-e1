import express from 'express';
import * as reviewsController from '../controllers/reviews.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { validateRequest } from '../middlewares/validator.middleware.js';
import { createOrUpdateReviewValidator } from '../validators/review.validators.js';

const router = express.Router();

router.post('/:movieId',
    authenticateUser,
    createOrUpdateReviewValidator,
    validateRequest,
    asyncHandler(reviewsController.createReview)
);

router.put('/:movieId',
    authenticateUser,
    createOrUpdateReviewValidator,
    validateRequest,
    asyncHandler(reviewsController.updateReview)
);

router.get('/:movieId',
    asyncHandler(reviewsController.getReviewsByMovieId)
);

export default router;
