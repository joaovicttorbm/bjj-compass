import { Router } from "express";
import trainingController from "../controller/trainingController.js";
import trainingMiddleware from "../middlewares/trainingMiddleware.js";

const trainingRoutes = Router();

trainingRoutes.post("", trainingMiddleware , trainingController.registerTraining); 

export default trainingRoutes;