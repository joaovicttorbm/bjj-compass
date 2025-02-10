import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";

const goalMiddleware = (req, res, next) => {
  const goalData = { ...req.body, user_id: req.user_id };
  console.log(goalData); 
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

export default goalMiddleware;
