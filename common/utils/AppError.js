import { HTTPSTATUS } from "../../config/http.config.js";
import ErrorCode  from "../enums/error-code.enum.js";

class AppError extends Error {
  constructor(message, statusCode = HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError ;
