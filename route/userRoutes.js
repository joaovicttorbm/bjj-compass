import { Router } from "express";
import userController from "../controller/userController.js";


const userRoutes = Router();

userRoutes.post("/register", userController.register); 

export default userRoutes;
