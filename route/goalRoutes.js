import { Router } from "express";
import goalController from "../controller/goalController.js";
import { goalRegisterMiddleware, goalUpdateMiddleware } from "../middlewares/goalMiddleware.js";



const goalRoutes = Router();

goalRoutes.post('/', goalRegisterMiddleware , goalController.registerGoal); 
goalRoutes.get('/' , goalController.getGoalsByUser); 
goalRoutes.put('/:goal_id', goalUpdateMiddleware , goalController.updateGoal); 


export default goalRoutes;