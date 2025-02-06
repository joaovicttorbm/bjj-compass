import { userSchemaValidation } from "../common/validator/userValidator.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { HTTPSTATUS } from "../config/http.config.js";
import userService from "../service/userService.js";

const register = asyncHandler(async (req, res) => {
  
  const body = userSchemaValidation.parse({
    ...req.body,
  });

  const newUser = await userService.registerUserService(body);
  
  console.log('User created:', newUser);

  return res.status(HTTPSTATUS.CREATED).json({
    message: "User registered successfully",
    data: newUser, 
  });
});

export default { register };
