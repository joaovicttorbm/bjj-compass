import bcrypt from 'bcrypt';
import { userSchemaValidation } from "../common/validator/userValidator.js";
import userModel from "../database/models/userModel.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from '../common/enums/error-code.enum.js';
import { hashValue } from '../common/utils/bcrypt.js';

const registerUserService = async (registerData) => {

  const body = userSchemaValidation.parse(registerData);

  const { username, email, password } = body;


  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    throw new BadRequestException(
      "User already exists with this email",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }

  const hashedPassword = await hashValue(password) ;


  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  return newUser; 
};

export default { registerUserService };
