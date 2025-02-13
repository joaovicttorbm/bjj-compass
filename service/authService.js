
import { compareValue } from "../common/utils/bcrypt.js";
import { findUserByEmail } from "../common/utils/findUser.js";
import { config } from "../config/app.config.js";
import userModel from "../database/models/userModel.js";
import jwt from 'jsonwebtoken';

const authenticateUser = async (email, password) => {
    
    const user = await findUserByEmail(email);

    const passwordIsValid = await compareValue(password, user.password);
    if (!passwordIsValid) {
        throw new Error('Senha inválida');
    }

    const token = jwt.sign({ userId: user._id }, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES_IN });
    return { token };
};

export default { authenticateUser };