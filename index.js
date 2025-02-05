import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import helmet from 'helmet';
import { config } from "./config/app.config.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import xssClean from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import rateLimit from 'express-rate-limit';
import connectDatabase from './database/database.js';
import { getEnv } from './common/utils/get-env.js';
import { setupSwagger } from './config/swagger.config.js';

const app = express();
const BASE_PATH = config.BASE_PATH;

// Configuração do Swagger
setupSwagger(app);

// Middlewares de Segurança e Utilitários
app.use(helmet());
app.use(
  cors({
    origin: config.APP_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(xssClean()); // Proteção contra XSS (Cross-Site Scripting)
app.use(mongoSanitize()); // Previne injeções de comandos MongoDB
app.use(hpp()); // Previne ataques de poluição de parâmetros HTTP

// Configuração de Logs
if (config.NODE_ENV=== 'development') {
  app.use(morgan('dev')); // Logs detalhados no console
} else if (config.NODE_ENV=== 'production') {
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    { flags: 'a' } // 'a' para append
  );
  app.use(morgan('combined', { stream: accessLogStream })); // Logs detalhados em arquivo
}

// Configuração de Limite de Requisições
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: 'Muitas requisições deste IP, tente novamente mais tarde.',
});
app.use(limiter);

// Inicialização do Servidor
app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
});
