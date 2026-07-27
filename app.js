import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import authRouter from './routes/auth.routes.js';
import moviesRouter from './routes/movies.routes.js';
import reviewsRouter from './routes/reviews.routes.js';
import watchlistRouter from './routes/watchlist.routes.js';
import swaggerSpec from './config/swagger.js';

const app = express();

app.use(morgan(process.env.NODE_ENV === 'test' ? 'tiny' : 'dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Movies API!',
    documentation: '/api-docs'
  });
});

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Movies API Explorer'
}));

app.use('/api/auth', authRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/watchlist', watchlistRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong' });
});

export default app;
