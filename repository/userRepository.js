import userModel from "../database/models/userModel.js";

const findUserByEmail = async (email) => {
  console.log("repo:", email)
  return await userModel.findOne({ email });
};

const createUser = async (userData) => {
  return await userModel.create(userData);
};

export default {
    findUserByEmail,
    createUser,
}