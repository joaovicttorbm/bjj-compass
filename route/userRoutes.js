import { Router } from "express";
import userController from "../controller/userController.js";
import userMiddleware from "../middlewares/userMiddleware.js";

const userRoutes = Router();

userRoutes.post("/register", userMiddleware , userController.register); 

export default userRoutes;
