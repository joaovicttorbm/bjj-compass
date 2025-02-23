import trainingModel from "../database/models/trainingModel.js";
import trainingDTO from "../dto/trainingDTO.js";
import { NotFoundException } from "../common/utils/catch-error.js";

const createTraining = async (trainingData) => {
  const training = await trainingModel.create(trainingData);
  return new trainingDTO(training);
};

const findAllByUser = async (userId) => {
  const trainings = await trainingModel.find({ userId })
    .select("date techniques durationMinutes intensityLevel notes")
    .lean();
  return trainingDTO.from(trainings);
};

const findById = async (trainingId, userId) => {
  const training = await trainingModel.findOne({ _id: trainingId, userId })
    .select("date techniques durationMinutes intensityLevel notes")
    .lean();
  if (!training) {
    throw new NotFoundException('Training not found for this user.');
  }
  return new trainingDTO(training);
};

const findByFilter = async (userId, filters) => {
  const trainings = await trainingModel.find({ userId, ...filters })
    .select("date techniques durationMinutes intensityLevel notes")
    .lean();
  return trainingDTO.from(trainings);
};

const updateTraining = async (trainingId, userId, trainingData) => {
  const training = await trainingModel.findOneAndUpdate(
    { _id: trainingId, userId },
    { $set: trainingData },
    { new: true, runValidators: true }
  ).lean();

  if (!training) {
    throw new NotFoundException('Training not found for this user.');
  }

  return new trainingDTO(training);
};

const deleteTraining = async (trainingId, userId) => {
  const training = await trainingModel.findOneAndDelete({ _id: trainingId, userId }).lean();
  if (!training) {
    throw new NotFoundException('Training not found for this user.');
  }
};
export default {
    createTraining,
    findAllByUser,
    findByFilter,
    findById,
    updateTraining,
    deleteTraining,
}