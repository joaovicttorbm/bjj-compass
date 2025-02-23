import goalModel from "../database/models/goalModel.js";
import { NotFoundException } from "../common/utils/catch-error.js";
import goalDTO from "../dto/goalDto.js";

const createGoal = async (goalData) => {
  const goal = await goalModel.create(goalData);
  return new goalDTO(goal);
};

const findGoalsByUser = async (userId) => {
  const goals = await goalModel.find({ userId }).select("description status progress notifications").lean();
  return goalDTO.from(goals);
};

const findGoalsByFilter = async (userId, filters) => {
  const goals = await goalModel.find({ userId, ...filters }).select("description status progress notifications").lean();
  return goalDTO.from(goals);
};

const findGoalById = async (goalId, userId) => {
  const goal = await goalModel.findOne({ _id: goalId, userId }).lean();
  if (!goal) {
    throw new NotFoundException("Goal not found for this user.");
  }
  return new goalDTO(goal);
};

const updateGoal = async (goalId, userId, goalData) => {
  const goal = await goalModel.findOneAndUpdate(
    { _id: goalId, userId },
    { $set: goalData },
    { new: true, runValidators: true }
  ).lean();

  if (!goal) {
    throw new NotFoundException("Goal not found for this user.");
  }

  return new goalDTO(goal);
};

const deleteGoal = async (goalId, userId) => {
  const goal = await goalModel.findOneAndDelete({ _id: goalId, userId }).lean();
  if (!goal) {
    throw new NotFoundException("Goal not found for this user.");
  }
};

export default {
    createGoal,
    findGoalById,
    findGoalsByFilter,
    findGoalsByUser,
    updateGoal,
    deleteGoal,
}
