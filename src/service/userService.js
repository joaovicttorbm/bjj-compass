import bcrypt from 'bcrypt';
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from '../common/enums/error-code.enum.js';
import { hashValue } from '../common/utils/bcrypt.js';
import userRepository from '../repository/userRepository.js';
import { welcomeEmailTemplate } from '../mailers/templates/template.js';
import { sendEmail } from '../mailers/mailer.js';
import userDTO from '../dto/userDTO.js';

const registerUser = async (registerData) => {

  const { username, email, password } = registerData;

  await checkIfUserExists(email);

  const hashedPassword = await hashValue(password) ;

  // const welcomeEmail =  welcomeEmailTemplate(username);
  // await sendEmail({
  //   to: email,
  // ...welcomeEmail,
  // });
  const user = new userDTO( await userRepository.createUser({ username, email, password: hashedPassword }) );
  // return user
};

const checkIfUserExists = async (email) => {
  const existingUser = await userRepository.findUserByEmail( email );
  if (existingUser) {
    throw new BadRequestException(
      "User already exists with this email",
      ErrorCode.AUTH_EMAIL_ALREADY_EXISTS
    );
  }
};

export default { registerUser };
