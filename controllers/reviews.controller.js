import { Review, User, Movie } from '../models/index.js';

export async function createReview(req, res) {
    const review = await Review.create({
        rating: req.body.rating,
        comment: req.body.comment,
        movieId: +req.params.movieId,
        userId: req.user.id
    });

    res.status(201).json(review);
};

export async function updateReview(req, res) {
    const review = await Review.findOne({
        where: {
            movieId: +req.params.movieId,
            userId: req.user.id 
        }
    });

    if (!review) {
        return res.status(404).json({ message: 'Review not found' });
    }

    review.rating = req.body.rating;
    review.comment = req.body.comment;
    await review.save();

    res.status(200).json(review);
};

export async function getReviewsByMovieId(req, res) {
    const reviews = await Review.findAll({
        where: { movieId: +req.params.movieId },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            },
            {
                model: Movie,
                as: 'movie',
                attributes: ['id', 'title']
            }
        ]
    });

    res.status(200).json(reviews);
};
