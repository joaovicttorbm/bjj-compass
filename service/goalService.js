import mongoose from "mongoose";
import ErrorCode from "../common/enums/error-code.enum.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import { findExistingUserById } from "../common/utils/findUser.js";
import goalModel from "../database/models/goalModel.js";
import { goalSchemaValidation } from "../common/validator/goalValidation.js";

const createGoalService = async (goalData) => {

  const { 
    description, 
    status, 
    progress, 
    notifications, 
    user_id 
} = goalSchemaValidation.parse(goalData);

  const existingUser = await findExistingUserById(user_id);

  return await createGoal({ 
    description, 
    status, 
    progress, 
    notifications, 
    user_id 
});
};

const createGoal = async (goalData) => {

  if (goalData.status === 'completed' && goalData.progress < 100) {
    throw new BadRequestException(
      'Status cannot be "completed" unless progress is 100%',
      ErrorCode.INVALID_GOAL_STATUS
    );
  }

  const goal = await goalModel.create(goalData);
  return goal;
};

export default { createGoalService };