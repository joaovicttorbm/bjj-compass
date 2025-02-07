import { Router } from "express";
import trainingController from "../controller/trainingController.js";



const trainingRoutes = Router();

trainingRoutes.post("", trainingController.registerTraining); 

export default trainingRoutes;