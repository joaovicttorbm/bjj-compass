import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import { trainingSchemaValidation } from "../common/validator/trainingValidation.js";
import trainingModel from "../database/models/trainingModel.js";
import userModel from "../database/models/userModel.js";
import TrainingDTO from "../dto/TrainingDTO.js";

const createTraining = async (trainingData) => {

    const { 
      date = Date.now(), 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      userId 
    } = trainingData;
  
    const training = await trainingModel.create(trainingData);
    const trainingDTO = TrainingDTO.from(training); 
    return trainingDTO; 
  }; 
  
const getTrainings = async (userId) => {
  const trainings = await trainingModel.find({ userId })
  .select("date techniques durationMinutes intensityLevel notes").lean();
  const trainingDTO = TrainingDTO.from(trainings); 
  return trainingDTO ? trainingDTO : [];
};

const getTrainingId = async (trainingId, userId) => {
  const training = await trainingModel.findOne({ _id: trainingId, userId })
  .select("date techniques durationMinutes intensityLevel notes").lean();
  if (!training) {
    throw new NotFoundException('Trainig not found for this user.');
  }
  const trainingDTO = TrainingDTO.from(training); 
  return trainingDTO; 
};

const getTrainigsByFilter = async (userId, filters) => {
  const trainings = await trainingModel.find({userId, ...filters})
  .select("date techniques durationMinutes intensityLevel notes").lean();
  const trainingDTO = TrainingDTO.from(trainings); 
  return trainingDTO ? trainingDTO : [];
};

const updateTrainig = async (trainingId, userId, trainingData) => {
  const training = await trainingModel.findOne({ _id: trainingId, userId })
  .select("date techniques durationMinutes intensityLevel notes");

  if (!training) {
  throw new NotFoundException('Trainig not found for this user.');
}

  Object.entries(trainingData).forEach(([key, value]) => {
  if (value !== undefined) {
    training[key] = value;
  }
  });

  await training.save(); 
  const trainingDTO = TrainingDTO.from(training); 
  return trainingDTO; 
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