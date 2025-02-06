import { userSchemaValidation } from "../common/validator/userValidator.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { HTTPSTATUS } from "../config/http.config.js";
import userService from "../service/userService.js";

/**
 * @swagger
 * /base_path/base_url/user/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user by providing a username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1234
 *               email:
 *                 type: string
 *                 example: user1234@gmail.com
 *               password:
 *                 type: string
 *                 example: user1234
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 5f5d63b9e85b3428bcd33d79
 *                     username:
 *                       type: string
 *                       example: user1234
 *                     email:
 *                       type: string
 *                       example: user1234@gmail.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$0NINhR9ak3wPiOG2zDNN2O96FZXq7htyzReugYTBOypfQ11io6mWS
 */

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
