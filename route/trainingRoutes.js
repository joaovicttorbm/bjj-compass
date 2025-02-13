import { Router } from "express";
import trainingController from "../controller/trainingController.js";
import { parseTrainingFiltersMiddleware, trainingGetIdMiddleware, trainingRegisterMiddleware, trainingUpdateMiddleware } from "../middlewares/trainingMiddleware.js";


const trainingRoutes = Router();

trainingRoutes.post("", trainingRegisterMiddleware , trainingController.registerTraining); 
trainingRoutes.get("", trainingController.getTrainings); 
trainingRoutes.get('/filter' , parseTrainingFiltersMiddleware, trainingController.getTrainingsByFilter); 
trainingRoutes.get('/:training_id' , trainingGetIdMiddleware , trainingController.getTrainingId);
trainingRoutes.put('/:training_id', trainingUpdateMiddleware , trainingController.updateTraining); 
// trainingRoutes.delete('/:training_id', trainingDeleteMiddleware , trainingController.deleteTraining); 


export default trainingRoutes;    