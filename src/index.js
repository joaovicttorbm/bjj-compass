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
import rateLimit from 'express-rate-limit';
import connectDatabase from './database/database.js';
import { getEnv } from './common/utils/get-env.js';
import { setupSwagger } from './config/swagger.config.js';
import { HTTPSTATUS } from './config/http.config.js';
import asyncHandler from './middlewares/asyncHandler.js';
import userRoutes from './route/userRoutes.js';
import trainingRoutes from './route/trainingRoutes.js';
import goalRoutes from './route/goalRoutes.js';
import authRoutes from './route/authRoutes.js';
import { authenticateToken } from './middlewares/authMiddleware.js';
import { BadRequestException } from './common/utils/catch-error.js';

const app = express();
const BASE_PATH = config.BASE_PATH;

// Configuração do Swagger
setupSwagger(app);

app.set('trust proxy', 1);

// Middlewares de Segurança e Utilitários
app.use(helmet());
app.use(
  cors({
    origin: [config.APP_ORIGIN, 'http://localhost:5173'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
    preflightContinue: false, 
  })
);
app.use((req, res, next) => {
  console.log('CORS header definido:', res.get('Access-Control-Allow-Origin'));
  next();
});

app.options('*', cors());
app.use(cookieParser());
app.use(express.json());
app.use(xssClean()); // Proteção contra XSS (Cross-Site Scripting)
app.use(mongoSanitize()); // Previne injeções de comandos MongoDB
app.use(hpp()); // Previne ataques de poluição de parâmetros HTTP

// Configuração de Logs
if (config.NODE_ENV === 'development') {
  app.use(morgan('dev')); // ✅ Usa logs no console
} else if (config.NODE_ENV === 'production') {
  app.use(morgan('combined')); // ✅ Log apenas no console (sem arquivos)
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
app.use(`${BASE_PATH}/training`, authenticateToken, trainingRoutes);
app.use(`${BASE_PATH}/goal`, authenticateToken, goalRoutes);


app.use((req, res, _next) => {
  // console.log(`[${req.method}] ${req.url}`, req.body);
  res.status(HTTPSTATUS.NOT_FOUND).json({ message: 'Rota não encontrada' });
});
app.use((err, req, res, next) => {
  console.error("Error occurred:", err);
  if (err instanceof BadRequestException) {
    return res.status(400).json({
      message: err.message,
      errorCode: err.code
    });
  }

  // Caso não seja um erro BadRequestException
  return res.status(500).json({
    message: "An unexpected error occurred.",
    errorCode: "UNKNOWN_ERROR"
  });
})

// // Inicialização do Servidor
// app.listen(config.PORT, async () => {
//   console.log("Server on");
//   await connectDatabase();
// });
connectDatabase();

export default app;