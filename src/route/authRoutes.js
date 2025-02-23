import { Router } from "express";
import authController from "../controller/authController.js";
import { loginMiddleware, validateEmailMiddleware, validateResetTokenMiddleware } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post('/login', loginMiddleware , authController.login); 
authRoutes.post("/forgot-password", validateEmailMiddleware, authController.forgotPassword);
authRoutes.post("/reset-password",validateResetTokenMiddleware, authController.resetPassword);

export default authRoutes;