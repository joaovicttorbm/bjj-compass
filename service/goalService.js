import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException, NotFoundException } from "../common/utils/catch-error.js";
import goalModel from "../database/models/goalModel.js";
import { goalSchemaValidation } from "../common/validator/goalValidation.js";

const createGoalService = async (goalData) => {
  const {   
    description, 
    status, 
    progress, 
    notifications, 
    user_id } = goalData;

  return await createGoal({ 
    description, 
    status, 
    progress, 
    notifications, 
    user_id 
});
};

const createGoal = async (goalData) => {
  const { description, status, progress, notifications, user_id } = goalData;
  if (goalData.status === 'completed' && goalData.progress < 100) {
    throw new BadRequestException(
      'Status cannot be "completed" unless progress is 100%',
      ErrorCode.INVALID_GOAL_STATUS
    );
  }

  const goal = await goalModel.create(goalData);
  return goal;
};

export const getGoalsByUserService = async (user_id) => {
  const goals = await goalModel.find({user_id: user_id});

  return goals;
};

export const updateGoalService = async (goal_id, user_id, goalData) => {
  const goal = await goalModel.findOne({ _id: new mongoose.Types.ObjectId(goal_id), user_id: new mongoose.Types.ObjectId(user_id) });

  if (!goal) {
    throw new NotFoundException('Goal not found for this user.');
  }


  Object.keys(goalData).forEach((key) => {
    if (goalData[key] !== undefined) {
      goal[key] = goalData[key];
    }
  });

  await goal.save();

  return goal;
};


export default { createGoalService, getGoalsByUserService , updateGoalService};