import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import goalService from "../service/goalService.js";

/**
 * @swagger
 * /base_path/base_url/goals:
 *   post:
 *     summary: Register a new goal
 *     description: Create a new goal by providing description, status, progress, notifications, and associated user ID.
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
 *               user_id:
 *                 type: string
 *                 description: ID of the user associated with the goal
 *                 example: "67a4f3824344b2d8ec96492a"
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
    const newGoal = await goalService.createGoalService(validatedBody);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Goal registered successfully",
        data: newGoal, 
    });
});

export default { registerGoal };