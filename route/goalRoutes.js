import { Router } from "express";
import goalController from "../controller/goalController.js";
import goalMiddleware from "../middlewares/goalMiddleware.js";


const goalRoutes = Router();

goalRoutes.post('/', goalMiddleware , goalController.registerGoal); 

export default goalRoutes;