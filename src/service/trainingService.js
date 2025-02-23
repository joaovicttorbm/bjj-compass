import trainingRepository from "../repository/trainingRepository.js";

const createTraining = async (trainingData) => {

    const { 
      date = Date.now(), 
      techniques, 
      durationMinutes, 
      intensityLevel, 
      notes, 
      userId 
    } = trainingData;
  
    return await trainingRepository.createTraining(trainingData);
  }; 
  
const getTrainings = async (userId) => {
  return await trainingRepository.findAllByUser(userId);
};

const getTrainingId = async (trainingId, userId) => {
  return await trainingRepository.findById(trainingId, userId);
};

const getTrainigsByFilter = async (userId, filters) => {
  return await trainingRepository.findByFilter(userId, filters);
};

const updateTrainig = async (trainingId, userId, trainingData) => {
  return await trainingRepository.updateTraining(trainingId, userId, trainingData);
};

const deleteTrainig = async (trainingId, userId) => {
  await trainingRepository.deleteTraining(trainingId, userId);
};

export default { 
  createTraining, 
  getTrainings,
  getTrainingId,
  getTrainigsByFilter,
  updateTrainig,
  deleteTrainig,
 };