import userModel from "../database/models/userModel.js";
import userDTO from "../dto/userDTO.js";

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

const findUserById = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const updateUserPassword = async (userId, newPassword) => {
  return await userModel.updateOne({ _id: userId }, { password: newPassword });
}
export default {
    findUserByEmail,
    createUser,
    findUserById,
    updateUserPassword,
}