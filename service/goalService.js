import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException, NotFoundException } from "../common/utils/catch-error.js";
import goalModel from "../database/models/goalModel.js";
import { goalSchemaValidation } from "../common/validator/goalValidation.js";

const validateGoalStatus = (goalData) => {
  if (goalData.status === 'completed' && goalData.progress < 100) {
    throw new BadRequestException(
      'Status cannot be "completed" unless progress is 100%',
      ErrorCode.INVALID_GOAL_STATUS
    );
  }
};

const createGoalService = async (goalData) => {
  validateGoalStatus(goalData);
  return await goalModel.create(goalData);
};

const getGoalsByUserService = async (user_id) => {
  return await goalModel.find({ user_id }).select("description status progress").lean();;
};

const getGoalIdByUserService = async (goal_id, user_id) => {
  return await goalModel.findOne({ _id: goal_id, user_id }).lean();
};

const updateGoalService = async (goal_id, user_id, goalData) => {
  const goal = await goalModel.findOne({ _id: goal_id, user_id }).lean();
  if (!goal) {
    throw new NotFoundException('Goal not found for this user.');
  }

  Object.entries(goalData).forEach(([key, value]) => {
    if (value !== undefined) {
      goal[key] = value;
    }
  });

  await goal.save();

  return goal;
};

export default {
  createGoalService,
  getGoalsByUserService,
  updateGoalService,
  getGoalIdByUserService,
};