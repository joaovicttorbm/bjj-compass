import { Router } from "express";
import goalController from "../controller/goalController.js";
import { goalDeleteMiddleware, goalGetIdMiddleware, goalRegisterMiddleware, goalUpdateMiddleware, parseGoalFiltersMiddleware } from "../middlewares/goalMiddleware.js";



const goalRoutes = Router();

goalRoutes.post('/', goalRegisterMiddleware , goalController.registerGoal); 
goalRoutes.get('/' , goalController.getGoals); 
goalRoutes.get('/filter' , parseGoalFiltersMiddleware , goalController.getGoalsByFilter); 
goalRoutes.get('/:goal_id' , goalGetIdMiddleware , goalController.getGoalId);
goalRoutes.put('/:goal_id', goalUpdateMiddleware , goalController.updateGoal); 
goalRoutes.delete('/:goal_id', goalDeleteMiddleware , goalController.deleteGoal); 

 

export default goalRoutes;