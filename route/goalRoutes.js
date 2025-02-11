import { Router } from "express";
import goalController from "../controller/goalController.js";
import { goalGetIdMiddleware, goalRegisterMiddleware, goalUpdateMiddleware, parseGoalFiltersMiddleware } from "../middlewares/goalMiddleware.js";



const goalRoutes = Router();

goalRoutes.post('/', goalRegisterMiddleware , goalController.registerGoal); 
goalRoutes.get('/' , goalController.getGoalsByUser); 
goalRoutes.get('/filter' , parseGoalFiltersMiddleware , goalController.getGoalsByFilter); 
goalRoutes.get('/:goal_id' , goalGetIdMiddleware , goalController.getGoalIdByUser);
goalRoutes.put('/:goal_id', goalUpdateMiddleware , goalController.updateGoal); 
 

export default goalRoutes;