import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import goalService from "../service/goalService.js";

/**
 * @swagger
 * /base_path/base_url/goals:
 *   post:
 *     summary: Register a new goal
 *     description: Create a new goal by providing goal details. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Brief description of the goal
 *                 example: "Aprenda técnicas básicas"
 *               status:
 *                 type: string
 *                 description: Current status of the goal
 *                 enum: ["in_progress", "completed", "abandoned"]
 *                 example: "completed"
 *               progress:
 *                 type: integer
 *                 description: Progress percentage of the goal
 *                 example: 100
 *               notifications:
 *                 type: boolean
 *                 description: Enable or disable notifications for this goal
 *                 example: true
 *     responses:
 *       201:
 *         description: Goal registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal registered successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: "Learn basic techniques"
 *                     status:
 *                       type: string
 *                       example: "completed"
 *                     progress:
 *                       type: integer
 *                       example: 100
 *                     notifications:
 *                       type: boolean
 *                       example: true
 *                     user_id:
 *                       type: string
 *                       example: "67a4f3824344b2d8ec96492a"
 *                     _id:
 *                       type: string
 *                       example: "67a68f2eeb478ff9bf12ddf5"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */

const registerGoal = asyncHandler ( async (req, res) => {
    const newGoal = await goalService.createGoalService(req.validatedBody);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Goal registered successfully",
        data: newGoal, 
    });
});

export const getGoalsByUser = async (req, res) => {
      const user_id = req.user_id; 

      const goals = await goalService.getGoalsByUserService(user_id);
  
      return res.status(HTTPSTATUS.OK).json({ 
        message: 'Goals retrieved successfully.', 
        data: goals 
    });
    };

export default { registerGoal, getGoalsByUser };