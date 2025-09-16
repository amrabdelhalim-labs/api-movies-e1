import { Movie } from '../models/movies.model.js';

export async function getAllMovies(req, res) {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
};

export async function getMovieById(req, res) {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    };

    res.status(200).json(movie);
};

export async function createMovie(req, res) {
    const movie = await Movie.create({
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre
    });

    res.status(201).json(movie);
};

export async function updateMovie(req, res) {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    };

    movie.title = req.body.title;
    movie.releaseYear = req.body.releaseYear;
    movie.genre = req.body.genre;

    await movie.save();
    res.status(200).json(movie);
};

export async function deleteMovie(req, res) {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    };

    await movie.destroy();
    res.status(200).json({ message: 'Movie deleted' });
};