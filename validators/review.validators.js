import { body } from "express-validator";

export const createOrUpdateReviewValidator = [
    body('rating').isNumeric().withMessage('Rating must be a number'),
    body('comment').notEmpty().withMessage('Comment is required')
];
