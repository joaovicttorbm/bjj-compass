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
  const { trainingId } = req.params; 
  if (validateObjectId(trainingId, res, "trainingId") === true);
  next()
};

export const parseTrainingFiltersMiddleware = (req, res, next) => {
  const { dateFrom, dateTo, techniques, durationMin, durationMax, intensityLevel } = req.query;

  const filters = {};

  if (dateFrom || dateTo) {
    filters.date = {};
  
    if (dateFrom) {
      const startOfDay = new Date(dateFrom);
      startOfDay.setUTCHours(0, 0, 0, 0); // Garante que começa no início do dia em UTC
      filters.date.$gte = startOfDay;
    }
  
    if (dateTo) {
      const endOfDay = new Date(dateTo);
      endOfDay.setUTCHours(23, 59, 59, 999); // Ajusta para o último milissegundo do dia em UTC
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
  const { trainingId } = params;

  if (!validateObjectId(trainingId, res, "trainingId")) {
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
  const { trainingId } = req.params;
  if (validateObjectId(trainingId, res, "trainingId") === true);

  next();
};