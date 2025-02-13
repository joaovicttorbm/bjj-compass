import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import { trainingSchemaValidation } from "../common/validator/trainingValidation.js";
import trainingModel from "../database/models/trainingModel.js";
import userModel from "../database/models/userModel.js";

const createTraining = async (trainingData) => {

    const { 
      date = Date.now(), 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      user_id 
    } = trainingData;
  
    return  await trainingModel.create(trainingData);
  }; 
  
const getTrainings = async (user_id) => {
  return await trainingModel.find({ user_id }).select("date techniques durationMinutes intensityLevel notes").lean();;
};

const getTrainingId = async (training_id, user_id) => {
  return await trainingModel.findOne({ _id: training_id, user_id }).lean();
};

const getTrainigsByFilter = async (user_id, filters) => {
  return await trainingModel.find({user_id, ...filters}).lean();
};
const updateTrainig = async (training_id, user_id, trainingData) => {
  const training = await trainingModel.findOne({ _id: training_id, user_id });

  if (!training) {
  throw new NotFoundException('Trainig not found for this user.');
}

  Object.entries(trainingData).forEach(([key, value]) => {
  if (value !== undefined) {
    training[key] = value;
  }
  });

  await training.save(); 

  return training;
};

const deleteTrainig = async (training_id, user_id) => {
  const training = await trainingModel.findOneAndDelete({ _id: training_id, user_id }).lean();
  if (!training) {
    throw new NotFoundException('Trainig not found for this user.');
  }
};

export default { 
  createTraining, 
  getTrainings,
  getTrainingId,
  getTrainigsByFilter,
  updateTrainig,
  deleteTrainig,
 };