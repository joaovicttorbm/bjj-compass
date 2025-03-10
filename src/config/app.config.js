import { getEnv } from "../common/utils/get-env.js";
const appConfig = () => ({
  NODE_ENV: getEnv("NODE_ENV", "development"),
  APP_ORIGIN: getEnv("APP_ORIGIN", "http://localhost:5173"),
  PORT: getEnv("PORT", "3000"),
  BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
  MONGO_URI: getEnv("MONGO_URI"),
  RESEND_API_KEY: getEnv("RESEND_API_KEY"),
  FRONTEND_URL: getEnv("FRONTEND_URL", "http://localhost:5173"),
  JWT: {
    SECRET: getEnv("JWT_SECRET", "123456"),
    EXPIRES_IN: getEnv("JWT_EXPIRES_IN", "15m"),
    REFRESH_SECRET: getEnv("JWT_REFRESH_SECRET"),
    REFRESH_EXPIRES_IN: getEnv("JWT_REFRESH_EXPIRES_IN", "15m"),
  },
});

export const config = appConfig();