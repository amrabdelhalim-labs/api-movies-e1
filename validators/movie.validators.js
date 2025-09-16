import { body } from "express-validator";

export const createOrUpdateMovieValidator = [
    body('title').notEmpty().withMessage('Title is required'),
    body('genre').notEmpty().withMessage('Genre is required'),
    body('releaseYear').notEmpty().withMessage('Release Year is required')
];