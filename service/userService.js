import bcrypt from 'bcrypt';
import { userSchemaValidation } from "../common/validator/userValidator.js";
import userModel from "../database/models/userModel.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from '../common/enums/error-code.enum.js';
import { hashValue } from '../common/utils/bcrypt.js';

const registerUser = async (registerData) => {

  const { username, email, password } = registerData;

  await checkIfUserExists(email);

  const hashedPassword = await hashValue(password) ;

  return createUser({ username, email, password: hashedPassword }); 
};

const checkIfUserExists = async (email) => {
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new BadRequestException(
      "User already exists with this email",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

export default { registerUser };
