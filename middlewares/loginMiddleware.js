import { loginSchemaValidation } from "../common/validator/userValidator.js";
import { HTTPSTATUS } from "../config/http.config.js";

const loginMiddleware = (req, res, next) => {
  const validationResult = loginSchemaValidation.safeParse(req.body);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid email or password data",
      errors: validationResult.error.errors,
    });
  }

  req.validatedBody = validationResult.data;
  next();
};

export default loginMiddleware;