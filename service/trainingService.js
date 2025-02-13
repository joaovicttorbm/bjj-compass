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
      userId 
    } = trainingData;
  
    return  await trainingModel.create(trainingData);
  }; 
  
const getTrainings = async (userId) => {
  return await trainingModel.find({ userId }).select("date techniques durationMinutes intensityLevel notes").lean();;
};

const getTrainingId = async (trainingId, userId) => {
  return await trainingModel.findOne({ _id: trainingId, userId }).lean();
};

const getTrainigsByFilter = async (userId, filters) => {
  return await trainingModel.find({userId, ...filters}).lean();
};
const updateTrainig = async (trainingId, userId, trainingData) => {
  const training = await trainingModel.findOne({ _id: trainingId, userId });

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

const deleteTrainig = async (trainingId, userId) => {
  const training = await trainingModel.findOneAndDelete({ _id: trainingId, userId }).lean();
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