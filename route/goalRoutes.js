import { Router } from "express";
import goalController from "../controller/goalController.js";

const goalRoutes = Router();

goalRoutes.post('/', goalController.registerGoal); 

export default goalRoutes;