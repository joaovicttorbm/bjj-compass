import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { config } from './app.config.js';




const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation  BJJ-COMPASS',
      version: '1.0.0',
      description: 'API for help Brazilian Jiu-Jitsu practitioners manage their training and goals in an organized and effective way.',
      contact: {
        name: 'João Matos',
        url: 'https://www.linkedin.com/in/joao-victtor-dev/',
        email: 'joaovicttorbispo@gmail.com',
      },
    },
    servers: [
      {
        url: config.BASE_PATH || 'http://localhost:3000', // Usa BASE_PATH da config, ou localhost por padrão
        description: 'API BJJ-COMPASS',
      },
    ],
  },
  apis: ['./src/modules/**/*.js', './src/common/**/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
