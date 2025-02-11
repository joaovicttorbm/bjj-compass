import { Router } from "express";
import goalController from "../controller/goalController.js";
import { goalGetIdMiddleware, goalRegisterMiddleware, goalUpdateMiddleware } from "../middlewares/goalMiddleware.js";



const goalRoutes = Router();

goalRoutes.post('/', goalRegisterMiddleware , goalController.registerGoal); 
goalRoutes.get('/' , goalController.getGoalsByUser); 
goalRoutes.get('/:goal_id' , goalGetIdMiddleware , goalController.getGoalIdByUser); 
goalRoutes.put('/:goal_id', goalUpdateMiddleware , goalController.updateGoal); 
 

export default goalRoutes;