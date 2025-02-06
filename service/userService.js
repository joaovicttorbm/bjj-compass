import bcrypt from 'bcrypt';
import { userSchemaValidation } from "../common/validator/userValidator.js";
import userModel from "../database/models/userModel.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from '../common/enums/error-code.enum.js';

const registerUserService = async (registerData) => {
    const { username, email, password } = registerData;
  
    const existingUser = await userModel.findOne({ email });
  
    if (existingUser) {
      throw new BadRequestException(
        "User already exists with this email",
        ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
      );
    }
  
    const newUser = await userModel.create({
      username,
      email,
      password,
    });
  };

  export default { registerUserService}