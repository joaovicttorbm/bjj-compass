import mongoose from "mongoose";
import { goalSchemaValidation, goalUpdateSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";

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


export const goalUpdateMiddleware = (req, res, next) => {
  const { description, status, progress, notifications } = req.body;
  const { goal_id } = req.params; 
  const goalData = { ...req.body, user_id: req.user_id };
  
  if (!mongoose.Types.ObjectId.isValid(goal_id)) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      error: 'Invalid goalId. It must be a valid ObjectId (24-character hexadecimal string).',
    });
  }

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

  // Se for válido, passa os dados validados para o próximo middleware ou controlador
  req.validatedBody = validationResult.data;
  next();
};


