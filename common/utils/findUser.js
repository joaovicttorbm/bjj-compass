import { default as mongoose } from "mongoose";
import { BadRequestException } from "./catch-error.js";
import ErrorCode from "../enums/error-code.enum.js";

  export const findUserByEmail = async (email) => {
    const user = await mongoose.model('User').findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }
  
    return user;
  };