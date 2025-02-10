import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import { trainingSchemaValidation } from "../common/validator/trainingValidation.js";
import trainingModel from "../database/models/trainingModel.js";
import userModel from "../database/models/userModel.js";

const createTrainingService = async (trainingData) => {

    const { 
      date = Date.now(), 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      user_id 
    } = trainingData;
  
    return await createTraining({
      date, 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      user_id
    });
  };
  
  const createTraining = async (trainingData) => {
    const training = await trainingModel.create(trainingData);
    return training;
  };

export default { createTrainingService };