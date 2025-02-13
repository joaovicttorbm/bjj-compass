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
import { HTTPSTATUS } from './config/http.config.js';
import asyncHandler from './middlewares/asyncHandler.js';
import userRoutes from './route/userRoutes.js';
import trainingRoutes from './route/trainingRoutes.js';
import userModel from './database/models/userModel.js';
import trainingModel from './database/models/trainingModel.js';
import goalRoutes from './route/goalRoutes.js';
import authRoutes from './route/authRoutes.js';
import authenticateToken from './middlewares/authenticateToken.js';


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

app.get(
  "/",
  asyncHandler(async (req, res, next) => {
    res.status(HTTPSTATUS.OK).json({
      message: "Hello Subscribers!!!",
    });
  })
);

//Routes
app.use(`${BASE_PATH}/user`, userRoutes);
app.use(`${BASE_PATH}/user/auth`, authRoutes);
app.use(`${BASE_PATH}/training`, authenticateToken , trainingRoutes);
app.use(`${BASE_PATH}/goal`, authenticateToken , goalRoutes);


app.use((req, res, _next) => {
  console.log(`[${req.method}] ${req.url}`, req.body);
  res.status(HTTPSTATUS.NOT_FOUND).json({ message: 'Rota não encontrada' });
});


// Inicialização do Servidor
app.listen(config.PORT, async () => {
  console.log(`Server listening on port http://${config.APP_ORIGIN}:${config.PORT}${config.BASE_PATH} in ${config.NODE_ENV}`);
  console.log(config.BASE_PATH)
  await connectDatabase();
});
