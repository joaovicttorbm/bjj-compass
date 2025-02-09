import { Router } from "express";
import loginMiddleware from "../middlewares/loginMiddleware.js";
import authController from "../controller/authController.js";

const authRoutes = Router();

authRoutes.post('/login', loginMiddleware , authController.login); 

export default authRoutes;