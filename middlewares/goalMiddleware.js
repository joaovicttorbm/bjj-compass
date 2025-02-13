import mongoose from "mongoose";
import { goalSchemaValidation, goalUpdateSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { validateObjectId } from "../common/utils/validateObjectId.js";

export const goalRegisterMiddleware = (req, res, next) => {
  const goalData = { ...req.body, userId: req.userId };

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
  const { goalId } = req.params; 
  if (validateObjectId(goalId, res, "goalId") === true);
  next()
};

export const parseGoalFiltersMiddleware = (req, res, next) => {
  const { status, progressMin, progressMax, notifications, dateFrom, dateTo } = req.query;

  const filters = {};

  if (status) {
    filters.status = status;
  }

  if (progressMin || progressMax) {
    filters.progress = {};
    if (progressMin) filters.progress.$gte = Number(progressMin);
    if (progressMax) filters.progress.$lte = Number(progressMax);
  }

  if (notifications !== undefined) {
    filters.notifications = notifications === 'true';
  }

  if (dateFrom || dateTo) {
    filters.createdAt = {};
    if (dateFrom) filters.createdAt.$gte = new Date(dateFrom);
    if (dateTo) filters.createdAt.$lte = new Date(dateTo);
  }

  req.goalFilters = filters;
  next();
};


export const goalUpdateMiddleware = (req, res, next) => {
  const { body, params, userId } = req;
  const { goalId } = params;
  const { description, status, progress, notifications } = body;
  const goalData = { ...body, userId };
  
  if (validateObjectId(goalId, res, "goalId") === true);

  if (!description && !status && progress === undefined && notifications === undefined) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'At least one field must be provided to update the goal.',
    });
  }
  const validationResult = goalUpdateSchemaValidation.safeParse(goalData);

  if (!validationResult.success) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid goal data',
      errors: validationResult.error.errors,
    });
  }
  req.validatedBody = validationResult.data;
  next();
};

export const goalDeleteMiddleware = (req, res, next) => {
  const { goalId } = req.params;
  if (validateObjectId(goalId, res, "goalId") === true);

  next();
};





