import { compareValue, hashValue } from "../common/utils/bcrypt.js";
import { config } from "../config/app.config.js";
import jwt from 'jsonwebtoken';
import userRepository from "../repository/userRepository.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from "../common/enums/error-code.enum.js";
import { sendEmail } from "../mailers/mailer.js";
import { resetPasswordEmailTemplate } from "../mailers/templates/template.js";
import userDTO from "../dto/userDTO.js";

const authenticateUser = async (email, password) => {
    
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new BadRequestException('User not found', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
      }
    const passwordIsValid = await compareValue(password, user.password);
    if (!passwordIsValid) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign({ userId: user._id }, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES_IN });
    return { token };
};

const requestPasswordReset = async (email) => {
     const userData = await userRepository.findUserByEmail(email);
     if (!userData) {
         throw new BadRequestException('User not found', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
     }
 
     const user = new userDTO(userData);

  
    const resetToken = jwt.sign({ userId: user.userId }, config.JWT.SECRET , { expiresIn: config.JWT.REFRESH_EXPIRES_IN });

    const resetLink = `${config.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const resetEmail =  resetPasswordEmailTemplate( user.username, user.email, resetLink  );
      await sendEmail({
        to: email,
      ...resetEmail,
      });
    return{
        resetToken: resetToken
    }
  };
  
const resetPassword = async (token, newPassword) => {
      const decoded = jwt.verify(token, config.JWT.SECRET);
      const user = await userRepository.findUserById(decoded.userId);
      if (!user) {
        throw new BadRequestException('User not found', ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
      }
  
      const hashedPassword = await hashValue(newPassword);
  
      await userRepository.updateUserPassword(user.id, hashedPassword);
  };

export default { 
    authenticateUser,
    requestPasswordReset,
    resetPassword,
};