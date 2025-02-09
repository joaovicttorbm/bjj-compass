import { userSchemaValidation } from "../common/validator/userValidator.js";
import { HTTPSTATUS } from "../config/http.config.js";

const userMiddleware = (req, res, next) => {
  const validationResult = userSchemaValidation.safeParse(req.body);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid user data",
      errors: validationResult.error.errors,
    });
  }

  req.validatedBody = validationResult.data;
  next();
};

export default userMiddleware;