import swaggerJsdoc from 'swagger-jsdoc';

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Movies API',
      version: '1.0.0',
      description: 'Interactive documentation for users, movies, reviews, and watchlists.'
    },
    servers: [{ url: '/', description: 'Current container' }],
    components: {
      securitySchemes: {
        tokenAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Use the raw JWT returned by register or login.'
        }
      },
      schemas: {
        UserRegistration: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Demo Viewer' },
            email: { type: 'string', format: 'email', example: 'viewer@example.test' },
            password: { type: 'string', minLength: 6, example: 'demo-password' }
          }
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' }
          }
        },
        MovieInput: {
          type: 'object',
          required: ['title', 'releaseYear', 'genre'],
          properties: {
            title: { type: 'string', example: 'The Example Film' },
            releaseYear: { type: 'integer', example: 2026 },
            genre: { type: 'string', example: 'Drama' }
          }
        },
        Movie: {
          allOf: [
            { $ref: '#/components/schemas/MovieInput' },
            {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' }
              }
            }
          ]
        },
        ReviewInput: {
          type: 'object',
          required: ['rating', 'comment'],
          properties: {
            rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
            comment: { type: 'string', example: 'A thoughtful and engaging film.' }
          }
        },
        Error: {
          type: 'object',
          properties: { error: { type: 'string' }, message: { type: 'string' } }
        }
      }
    }
  },
  apis: ['./routes/*.js']
});

export default swaggerSpec;
