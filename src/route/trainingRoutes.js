import { Router } from "express";
import trainingController from "../controller/trainingController.js";
import { parseTrainingFiltersMiddleware, trainingDeleteMiddleware, trainingGetIdMiddleware, trainingRegisterMiddleware, trainingUpdateMiddleware } from "../middlewares/trainingMiddleware.js";


const trainingRoutes = Router();

trainingRoutes.post("", trainingRegisterMiddleware , trainingController.registerTraining); 
trainingRoutes.get("", trainingController.getTrainings); 
trainingRoutes.get('/filter' , parseTrainingFiltersMiddleware, trainingController.getTrainingsByFilter); 
trainingRoutes.get('/:trainingId' , trainingGetIdMiddleware , trainingController.getTrainingId);
trainingRoutes.put('/:trainingId', trainingUpdateMiddleware , trainingController.updateTraining); 
trainingRoutes.delete('/:trainingId', trainingDeleteMiddleware , trainingController.deleteTraining); 


export default trainingRoutes;    