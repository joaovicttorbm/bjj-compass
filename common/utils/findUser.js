import { default as mongoose } from "mongoose";
import { BadRequestException } from "./catch-error.js";
import ErrorCode from "../enums/error-code.enum.js";

export const findExistingUserById = async (user_id) => {
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw new BadRequestException('Invalid user ID', ErrorCode.INVALID_USER_ID);
    }
  
    const user = await mongoose.model('User').findById(user_id);
    if (!user) {
      throw new BadRequestException('User not found', ErrorCode.USER_NOT_FOUND);
    }
  
    return user;
  };


  export const findUserByEmail = async (email) => {
    const user = await mongoose.model('User').findOne({ email });

    if (!user) {
      throw new BadRequestException('User not found', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }
  
    return user;
  };