import { compareValue } from "../common/utils/bcrypt.js";
import { config } from "../config/app.config.js";
import jwt from 'jsonwebtoken';
import userRepository from "../repository/userRepository.js";
import { BadRequestException } from "../common/utils/catch-error.js";
import ErrorCode from "../common/enums/error-code.enum.js";

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

export default { authenticateUser };