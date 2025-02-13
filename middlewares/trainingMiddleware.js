import { validateObjectId } from "../common/utils/validateObjectId.js";
import { trainingSchemaValidation, trainingUpdateSchemaValidation } from "../common/validator/trainingValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";

export const trainingRegisterMiddleware = (req, res, next) => {
  const trainingData = { ...req.body, userId: req.userId };

  if (trainingData.date) {
    const parsedDate = new Date(trainingData.date);
    if (!isNaN(parsedDate.getTime())) {
      trainingData.date = parsedDate;
    } else {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid date format",
        errors: [{ path: ["date"], message: "Expected a valid date" }],
      });
    }
  }

  const validationResult = trainingSchemaValidation.safeParse(trainingData);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid training data",  
      errors: validationResult.error.errors,
    });
  }

  req.validatedBody = validationResult.data;
  next();
};
export const trainingGetIdMiddleware = (req, res, next) => {
  const { training_id } = req.params; 
  if (validateObjectId(training_id, res, "training_id") === true);
  next()
};

export const parseTrainingFiltersMiddleware = (req, res, next) => {
  const { dateFrom, dateTo, techniques, durationMin, durationMax, intensityLevel } = req.query;

  const filters = {};

  if (dateFrom || dateTo) {
    filters.date = {};
  
    if (dateFrom) {
      filters.date.$gte = new Date(dateFrom);
    }
  
    if (dateTo) {
      const endOfDay = new Date(dateTo);
      endOfDay.setHours(23, 59, 59, 999);
      filters.date.$lte = endOfDay;
    }
  }
  

 
  if (techniques) {
    filters.techniques = { $in: techniques.split(',') };
  }

  if (durationMin || durationMax) {
    filters.durationMinutes = {};
    if (durationMin) filters.durationMinutes.$gte = Number(durationMin);
    if (durationMax) filters.durationMinutes.$lte = Number(durationMax);
  }

  if (intensityLevel) {
    filters.intensityLevel = intensityLevel;
  }


  req.trainingFilters = filters;  
  next();
};

export const trainingUpdateMiddleware = (req, res, next) => {
  const { params, userId } = req;
  const { training_id } = params;

  if (!validateObjectId(training_id, res, "training_id")) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid training ID format.",
    });
  }

  const trainingData = { ...req.body, userId };

  if (trainingData.date) {
    const parsedDate = new Date(trainingData.date);
    if (!isNaN(parsedDate.getTime())) {
      trainingData.date = parsedDate;
    } else {
      return res.status(HTTPSTATUS.BAD_REQUEST).json({
        message: "Invalid date format",
        errors: [{ path: ["date"], message: "Expected a valid date" }],
      });
    }
  }

  if (![trainingData.date, trainingData.techniques, trainingData.durationMinutes, trainingData.intensityLevel, trainingData.notes].some(field => field != null)) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "At least one field must be provided to update the training.",
    });
  }

  const validationResult = trainingUpdateSchemaValidation.safeParse(trainingData);

  if (!validationResult.success) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid training data",
      errors: validationResult.error.errors,
    });
  }

  req.validatedBody = validationResult.data;
  next();
};

export const trainingDeleteMiddleware = (req, res, next) => {
  const { training_id } = req.params;
  if (validateObjectId(training_id, res, "training_id") === true);

  next();
};