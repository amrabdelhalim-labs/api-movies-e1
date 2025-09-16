import express from 'express';
import * as watchlistController from '../controllers/watchlist.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/:movieId',
    authenticateUser,
    asyncHandler(watchlistController.addToWatchList)
);

router.get('/',
    authenticateUser,
    asyncHandler(watchlistController.getWatchListByUserId)
);

router.delete('/:movieId',
    authenticateUser,
    asyncHandler(watchlistController.removeFromWatchList)
);

export default router;
