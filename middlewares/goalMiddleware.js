import mongoose from "mongoose";
import { goalSchemaValidation, goalUpdateSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { validateObjectId } from "../common/utils/validateObjectId.js";

export const goalRegisterMiddleware = (req, res, next) => {
  const goalData = { ...req.body, user_id: req.user_id };

  const validationResult = goalSchemaValidation.safeParse(goalData);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid goal data",
      errors: validationResult.error.errors,
    });
  }
  req.validatedBody = validationResult.data;
  next(); 
};

export const goalGetIdMiddleware = (req, res, next) => {
  const { goal_id } = req.params; 
  if (validateObjectId(goal_id, res, "goal_id") === true);
  next()
};

export const goalUpdateMiddleware = (req, res, next) => {
  const { body, params, user_id } = req;
  const { goal_id } = params;
  const { description, status, progress, notifications } = body;
  const goalData = { ...body, user_id };
  
  if (validateObjectId(goal_id, res, "goal_id") === true);

  if (!description && !status && progress === undefined && notifications === undefined) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'At least one field must be provided to update the goal.',
    });
  }
  const validationResult = goalUpdateSchemaValidation.safeParse(goalData);

  if (!validationResult.success) {
    return res.status(400).json({
      message: 'Invalid goal data',
      errors: validationResult.error.errors,
    });
  }
  req.validatedBody = validationResult.data;
  next();
};




