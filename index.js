import express from 'express';
import morgan from 'morgan';
import { initDB } from './utilities/db.js';
import authRouter from './routes/auth.routes.js';
import moviesRouter from './routes/movies.routes.js';
import reviewsRouter from './routes/reviews.routes.js';
import watchlistRouter from './routes/watchlist.routes.js';
import { createDefaultAdmin } from './utilities/admin.js';

initDB().then(() => {
    createDefaultAdmin();
});

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Movies API!' });
});

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/watchlist', watchlistRouter);


app.use((req, res) => {
    res.status(404).json({error: 'Not Found'})
});

app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({ error: 'Something went wrong' })
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});