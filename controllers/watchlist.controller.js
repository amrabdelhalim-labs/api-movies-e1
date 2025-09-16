import { WatchList, Movie } from "../models/index.js";

export async function addToWatchList(req, res) {
    const movie = await WatchList.create({
        userId: req.user.id,
        movieId: +req.params.movieId
    });

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    };

    res.status(201).json(movie);
};

export async function getWatchListByUserId(req, res) {
    const movies = await WatchList.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Movie,
                as: 'movie',
                attributes: ['id', 'title']
            }
        ]
    });

    res.status(200).json(movies);
};

export async function removeFromWatchList(req, res) {
    await WatchList.destroy({
        where: {
            userId: req.user.id,
            movieId: req.params.movieId
        }
    });

    if (!res) {
        return res.status(404).json({ message: 'Watchlist item not found' });
    };

    res.status(200).json({ message: 'Watchlist item removed' });
};
