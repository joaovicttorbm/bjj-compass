import mongoose from "mongoose";
import { HTTPSTATUS } from "../../config/http.config.js";


export const validateObjectId = (id, res, entityName) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      error: `Invalid ${entityName}. It must be a valid ObjectId (24-character hexadecimal string).`,
    });
  }
  return true;
};
