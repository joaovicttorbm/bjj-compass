import { trainingSchemaValidation } from "../common/validator/trainingValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";

const trainingMiddleware = (req, res, next) => {
  const trainingData = { ...req.body, user_id: req.user_id };
  console.log(trainingData); 
  const validationResult = trainingSchemaValidation.safeParse(trainingData);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid goal data",
      errors: validationResult.error.errors,
    });
  }

  req.validatedBody = validationResult.data;
  next();
};

export default trainingMiddleware;