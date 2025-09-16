import express from 'express';
import * as moviesController from '../controllers/movies.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';
import { authenticateAdmin } from '../middlewares/admin.middleware.js';
import { validateRequest } from '../middlewares/validator.middleware.js';
import { createOrUpdateMovieValidator } from '../validators/movie.validators.js';

const router = express.Router();

router.get('/',
    asyncHandler(moviesController.getAllMovies)
);

router.get('/:id',
    asyncHandler(moviesController.getMovieById)
);

router.post('/',
    authenticateUser,
    createOrUpdateMovieValidator,
    validateRequest,
    asyncHandler(authenticateAdmin),
    asyncHandler(moviesController.createMovie)
);

router.put('/:id',
    authenticateUser,
    asyncHandler(authenticateAdmin),
    createOrUpdateMovieValidator,
    validateRequest,
    asyncHandler(moviesController.updateMovie)
);

router.delete('/:id',
    authenticateUser,
    asyncHandler(authenticateAdmin),
    asyncHandler(moviesController.deleteMovie)
);

export default router;