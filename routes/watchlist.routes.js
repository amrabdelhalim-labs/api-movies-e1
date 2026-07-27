import express from 'express';
import * as watchlistController from '../controllers/watchlist.controller.js';
import { asyncHandler } from '../utilities/helpers.js';
import { authenticateUser } from '../middlewares/auth.middleware.js';

const router = express.Router();

/**
 * @openapi
 * /api/watchlist/{movieId}:
 *   post:
 *     tags: [Watchlist]
 *     summary: Add a movie to the current user's watchlist
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       201: { description: Watchlist item created }
 */
router.post('/:movieId',
    authenticateUser,
    asyncHandler(watchlistController.addToWatchList)
);

/**
 * @openapi
 * /api/watchlist:
 *   get:
 *     tags: [Watchlist]
 *     summary: Return the current user's watchlist
 *     security: [{ tokenAuth: [] }]
 *     responses:
 *       200: { description: Watchlist with movie summaries }
 */
router.get('/',
    authenticateUser,
    asyncHandler(watchlistController.getWatchListByUserId)
);

/**
 * @openapi
 * /api/watchlist/{movieId}:
 *   delete:
 *     tags: [Watchlist]
 *     summary: Remove a movie from the current user's watchlist
 *     security: [{ tokenAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Watchlist item removed }
 */
router.delete('/:movieId',
    authenticateUser,
    asyncHandler(watchlistController.removeFromWatchList)
);

export default router;
