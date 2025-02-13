import { goalSchemaValidation } from "../common/validator/goalValidation.js";
import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import goalService from "../service/goalService.js";

/**
 * @swagger
 * /base_path/base_url/goal:
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
 *                     userId:
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
    const newGoal = await goalService.createGoal(req.validatedBody);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Goal registered successfully",
        data: newGoal, 
    });
});

/**
 * @swagger
 * /base_path/base_url/goal:
 *   get:
 *     summary: Get all goals
 *     description: Retrieve all goals for the authenticated user. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved all goals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goals retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67aa22895d99240ada6de24c"
 *                       description:
 *                         type: string
 *                         example: "Learn basic techniques"
 *                       status:
 *                         type: string
 *                         example: "completed"
 *                       progress:
 *                         type: integer
 *                         example: 100
 *                       notifications:
 *                         type: boolean
 *                         example: true
 *                       userId:
 *                         type: string
 *                         example: "67a649c42ff750984cd49fe7"
 *                       __v:
 *                         type: integer
 *                         example: 0
 */

const getGoals = asyncHandler(async (req, res) => {
      const userId = req.userId; 

      const goals = await goalService.getGoalsByUser(userId);
  
      return res.status(HTTPSTATUS.OK).json({ 
        message: 'Goals retrieved successfully.', 
        data: goals 
    });
});

/**
 * @swagger
 * /base_path/base_url/goal/{goalId}:
 *   get:
 *     summary: Get goal by ID
 *     description: Retrieve a single goal for the authenticated user by its unique ID. The user ID is automatically extracted from the authentication token.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the goal to retrieve.
 *         schema:
 *           type: string
 *           example: "67aa22895d99240ada6de24c"
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved the goal
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "67aa22895d99240ada6de24c"
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
 *                     userId:
 *                       type: string
 *                       example: "67a649c42ff750984cd49fe7"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */

const getGoalId = asyncHandler(async (req, res) => {
    const userId = req.userId; 
    const { goalId } = req.params; 
    const goals = await goalService.getGoalIdByUser(goalId, userId);

    return res.status(HTTPSTATUS.OK).json({ 
      message: 'Goals retrieved successfully.', 
      data: goals 
  });
});

/**
 * @swagger
 * /base_path/base_url/goal/filter:
 *   get:
 *     summary: Get goals for the authenticated user
 *     description: Retrieve a list of goals for the authenticated user. You can apply optional filters for status, progress range, notifications, and creation date.
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter by goal status (in_progress, completed, abandoned).
 *         schema:
 *           type: string
 *           example: "completed"
 *       - in: query
 *         name: progressMin
 *         required: false
 *         description: Minimum progress percentage for filtering goals.
 *         schema:
 *           type: integer
 *           example: 50
 *       - in: query
 *         name: progressMax
 *         required: false
 *         description: Maximum progress percentage for filtering goals.
 *         schema:
 *           type: integer
 *           example: 100
 *       - in: query
 *         name: notifications
 *         required: false
 *         description: Filter by notifications enabled (true or false).
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: query
 *         name: dateFrom
 *         required: false
 *         description: Start date for filtering by creation date.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *       - in: query
 *         name: dateTo
 *         required: false
 *         description: End date for filtering by creation date.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-12-31"
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of goals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goals retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67aa22895d99240ada6de24c"
 *                       description:
 *                         type: string
 *                         example: "Learn basic techniques"
 *                       status:
 *                         type: string
 *                         example: "completed"
 *                       progress:
 *                         type: integer
 *                         example: 100
 *                       notifications:
 *                         type: boolean
 *                         example: true
 *                       userId:
 *                         type: string
 *                         example: "67a649c42ff750984cd49fe7"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-01T10:00:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-02T12:30:00Z"
 *                       __v:
 *                         type: integer
 *                         example: 0
 */

const getGoalsByFilter = async (req, res) => {
    const userId = req.userId; 
    const filters = req.goalFilters;
    const goals = await goalService.getGoalsByFilter(userId, filters);
    return res.status(HTTPSTATUS.OK).json({
        message: 'Goals Filter retrieved successfully.', 
        data: goals 
    });
}


/**
 * @swagger
 * /base_path/base_url/goal/{goalId}:
 *   put:
 *     summary: Update an existing goal
 *     description: Update the details of an existing goal. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the goal to update
 *         schema:
 *           type: string
 *           example: "67aa22895d99240ada6de24c"
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
 *                 example: "1ereee"
 *               status:
 *                 type: string
 *                 description: Current status of the goal
 *                 enum: ["in_progress", "completed", "abandoned"]
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: Goal updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal updated successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       example: "1ereee"
 *                     status:
 *                       type: string
 *                       example: "completed"
 *                     progress:
 *                       type: integer
 *                       example: 100
 *                     notifications:
 *                       type: boolean
 *                       example: true
 *                     userId:
 *                       type: string
 *                       example: "67a649c42ff750984cd49fe7"
 *                     _id:
 *                       type: string
 *                       example: "67aa22895d99240ada6de24c"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */

const updateGoal = asyncHandler(async (req, res) => {
    const userId = req.userId;  
    const goalId = req.params.goalId; 
    const goalData = req.validatedBody;  
         
    const updatedGoal = await goalService.updateGoal(goalId, userId, goalData);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Goal updated successfully.',
        data: updatedGoal,
    });
})

/**
 * @swagger
 * /base_path/base_url/goal/{goalId}:
 *   delete:
 *     summary: Delete an existing goal
 *     description: Deletes a specific goal for the authenticated user based on its unique ID. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # JWT token authentication
 *     parameters:
 *       - name: goalId
 *         in: path
 *         required: true
 *         description: The ID of the goal to delete
 *         schema:
 *           type: string
 *           example: "67aa22895d99240ada6de24c"
 *     responses:
 *       200:
 *         description: Goal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Goal deleted successfully."
 */

const deleteGoal = asyncHandler(async (req, res) => {
    const userId = req.userId;  
    const goalId = req.params.goalId;   
         
    const updatedGoal = await goalService.deleteGoal(goalId, userId);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Goal delete successfully.',
    });
})

export default { 
    registerGoal , 
    getGoals , 
    updateGoal , 
    getGoalId , 
    getGoalsByFilter ,
    deleteGoal, 
};