import { HTTPSTATUS } from "../../config/http.config.js";
import ErrorCode from "../enums/error-code.enum.js";
import AppError  from "./AppError.js";

export class NotFoundException extends AppError {
  constructor(message = "Resource not found", errorCode = ErrorCode.RESOURCE_NOT_FOUND) {
    super(message, HTTPSTATUS.NOT_FOUND, errorCode);
  }
}

export class BadRequestException extends AppError {
  constructor(message = "Bad Request", errorCode = ErrorCode.VALIDATION_ERROR) {
    super(message, HTTPSTATUS.BAD_REQUEST, errorCode);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = "Unauthorized Access", errorCode = ErrorCode.ACCESS_UNAUTHORIZED) {
    super(message, HTTPSTATUS.UNAUTHORIZED, errorCode);
  }
}

export class InternalServerException extends AppError {
  constructor(message = "Internal Server Error", errorCode = ErrorCode.INTERNAL_SERVER_ERROR) {
    super(message, HTTPSTATUS.INTERNAL_SERVER_ERROR, errorCode);
  }
}

export class HttpException extends AppError {
  constructor(message = "HTTP Exception Error", statusCode, errorCode = ErrorCode.VERIFICATION_ERROR) {
    super(message, statusCode, errorCode);
  }
}
