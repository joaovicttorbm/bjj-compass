import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import { trainingSchemaValidation } from "../common/validator/trainingValidation.js";
import trainingModel from "../database/models/trainingModel.js";
import userModel from "../database/models/userModel.js";


const createTrainingService = async (trainingData) => {
    // Valida os dados de entrada
    const { 
      date = Date.now(), 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      user_id 
    } = trainingSchemaValidation.parse(trainingData);
  
    const existingUser = await findExistingUser(user_id);
  
    return await createTraining({
      date, 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      user_id
    });
  };
  
  const findExistingUser = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestException("Invalid user ID", ErrorCode.INVALID_USER_ID);
    }
  
    const user = await userModel.findById(userId);
    if (!user) {
      throw new BadRequestException("User not found", ErrorCode.USER_NOT_FOUND);
    }
  
    return user;
  };
  
  const createTraining = async (trainingData) => {
    const training = await trainingModel.create(trainingData);
    return training;
  };

export default { createTrainingService };