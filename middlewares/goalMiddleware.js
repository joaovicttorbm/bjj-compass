import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";

const goalMiddleware = (req, res, next) => {
  const validationResult = goalSchemaValidation.safeParse(req.body);

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
