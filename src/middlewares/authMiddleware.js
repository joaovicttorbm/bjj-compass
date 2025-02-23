import jwt from "jsonwebtoken";
import { HTTPSTATUS } from "../config/http.config.js";
import { config } from "../config/app.config.js";
import { emailSchemaValidation, loginSchemaValidation, resetPasswordSchemaValidation } from "../common/validator/userValidator.js";


export const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Formato esperado: "Bearer <token>"

  if (!token) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Token não fornecido",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.SECRET);
    req.userId = decoded.userId;  
    next();
  } catch (error) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Token inválido",
    });
  }
};

export const loginMiddleware = (req, res, next) => {
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

export const validateEmailMiddleware = async (req, res, next) => {
  const validationResult = emailSchemaValidation.safeParse(req.body);

  if (!validationResult.success) {

    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Invalid email.",
      errors: validationResult.error.errors,
    });
  }
  req.validatedBody = validationResult.data;
  next();
};

export const validateResetTokenMiddleware = (req, res, next) => {
  const validationResult = resetPasswordSchemaValidation.safeParse( req.body );

  if (!validationResult.success ) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: "Password and Recovery token is mandatory. ",
      errors: validationResult.error.errors,
    });
  }
  req.validatedBody = validationResult.data;
  next();
}
