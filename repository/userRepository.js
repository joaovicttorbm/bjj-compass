import userModel from "../database/models/userModel.js";

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email });
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

const findUserById = async (id) => {
  return await userModel.findById(id).select("username email")
};

export default {
    findUserByEmail,
    createUser,
    findUserById,
}