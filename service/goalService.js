import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException, NotFoundException } from "../common/utils/catch-error.js";
import goalModel from "../database/models/goalModel.js";
import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import GoalDTO from "../dto/goalDto.js";

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
  const goal = await goalModel.create(goalData);
  const goalDTO = GoalDTO.from(goal); 
  return goalDTO 
};

const getGoalsByUser = async (userId) => {
  const goals = await goalModel.find({ userId }).select("description status progress notifications").lean();
  const goalDTO = GoalDTO.from(goals); 
  return goalDTO ? goalDTO : []; 
};

const getGoalsByFilter = async (userId, filters) => {
  const goals = await goalModel.find({userId, ...filters}).select("description status progress notifications").lean();
  const goalDTO = GoalDTO.from(goals); 
  return goalDTO ? goalDTO : []; 
};

const getGoalIdByUser = async (goalId, userId) => {
  const goal = await goalModel.findOne({ _id: goalId, userId }).lean();
  if (!goal) {
    throw new NotFoundException('Goal not found for this user.');
  }
  const goalDTO = GoalDTO.from(goal); 
  return goalDTO  
};

const updateGoal = async (goalId, userId, goalData) => {
  const goal = await goalModel.findOne({ _id: goalId, userId });

  if (!goal) {
  throw new NotFoundException('Goal not found for this user.');
}

  Object.entries(goalData).forEach(([key, value]) => {
  if (value !== undefined) {
    goal[key] = value;
  }
  });

  await goal.save(); 
  const goalDTO = GoalDTO.from(goal); 
  return goalDTO ? goalDTO : []; 
};

const deleteGoal = async (goalId, userId) => {
  const goal = await goalModel.findOneAndDelete({ _id: goalId, userId }).lean();
  if (!goal) {
    throw new NotFoundException('Goal not found for this user.');
  }
};

export default {
  createGoal,
  getGoalsByUser,
  updateGoal,
  getGoalIdByUser,
  getGoalsByFilter,
  deleteGoal,
  };