import goalRepository from "../repository/goalRepository.js";

const validateGoalStatus = (goalData) => {
  if (goalData.status === 'completed' && goalData.progress < 100) {
    throw new BadRequestException(
      'Status cannot be "completed" unless progress is 100%',
      ErrorCode.INVALID_GOAL_STATUS
    );
  }
};

const createGoal = async (goalData) => {
  validateGoalStatus(goalData);
  return await goalRepository.createGoal(goalData);
};

const getGoalsByUser = async (userId) => {
  return await goalRepository.findGoalsByUser(userId);
};

const getGoalsByFilter = async (userId, filters) => {
  return await goalRepository.findGoalsByFilter(userId, filters);
};

const getGoalIdByUser = async (goalId, userId) => {
  return await goalRepository.findGoalById(goalId, userId);
};

const updateGoal = async (goalId, userId, goalData) => {
  return await goalRepository.updateGoal(goalId, userId, goalData);
};

const deleteGoal = async (goalId, userId) => {
  return await goalRepository.deleteGoal(goalId, userId);
};

export default {
  createGoal,
  getGoalsByUser,
  updateGoal,
  getGoalIdByUser,
  getGoalsByFilter,
  deleteGoal,
  };