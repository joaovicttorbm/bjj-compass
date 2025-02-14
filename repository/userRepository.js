import userModel from "../database/models/userModel.js";

const findUserByEmail = async (email) => {
  return await userModel.findOne({ email }).lean();
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

export default {
    findUserByEmail,
    createUser,
}