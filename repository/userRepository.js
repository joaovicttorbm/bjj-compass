import userModel from "../database/models/userModel.js";
import UserDTO from "../dto/UserDTO.js";

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

const findUserById = async (id) => {
  const user = await userModel.findById(id).select("username email");
  return new UserDTO(user);
};

export default {
    findUserByEmail,
    createUser,
    findUserById,
}