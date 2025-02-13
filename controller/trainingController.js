import { HTTPSTATUS } from "../config/http.config.js";
import { default as asyncHandler } from "../middlewares/asyncHandler.js";
import trainingService from "../service/trainingService.js";

/**
 * @swagger
 * /base_path/base_url/training:
 *   post:
 *     summary: Register a new training session
 *     description: Create a new training session by providing training details. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               techniques:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Push-up", "Squats"]
 *               durationMinutes:
 *                 type: integer
 *                 description: Duration of the training session in minutes
 *                 example: 30
 *               intensityLevel:
 *                 type: string
 *                 description: Intensity level of the training session
 *                 enum: ["low", "medium", "high"]
 *                 example: "medium"
 *               notes:
 *                 type: string
 *                 description: Additional notes about the training session
 *                 example: "Focado em resistência muscular"
 *     responses:
 *       201:
 *         description: Training registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Training registered successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a64b842ff750984cd49fea
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-07T18:05:56.576Z"
 *                     techniques:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Push-up", "Squats"]
 *                     durationMinutes:
 *                       type: integer
 *                       example: 30
 *                     intensityLevel:
 *                       type: string
 *                       example: "medium"
 *                     notes:
 *                       type: string
 *                       example: "Focado em resistência muscular"
 *                     user_id:
 *                       type: string
 *                       example: 67a4f3824344b2d8ec96492g
 *                     __v:
 *                       type: integer
 *                       example: 0
 */

const registerTraining = asyncHandler ( async (req, res) => {
    const newTraining = await trainingService.createTraining(req.validatedBody);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Training registered successfully",
        data: newTraining, 
    });
});

/**
 * @swagger
 * /base_path/base_url/training/{training_id}:
 *   get:
 *     summary: Get training by ID
 *     description: Retrieve a single training for the authenticated user by its unique ID. The user ID is automatically extracted from the authentication token.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the training to retrieve.
 *         schema:
 *           type: string
 *           example: "67aa22895d99240ada6de24c"
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved the training
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Training retrieved successfully."
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 67a64b842ff750984cd49fea
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-07T18:05:56.576Z"
 *                     techniques:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Push-up", "Squats"]
 *                     durationMinutes:
 *                       type: integer
 *                       example: 30
 *                     intensityLevel:
 *                       type: string
 *                       example: "medium"
 *                     notes:
 *                       type: string
 *                       example: "Focado em resistência muscular"
 */

const getTrainingId = asyncHandler(async (req, res) => {
    const user_id = req.user_id; 
    const { training_id } = req.params; 
    const trainings = await trainingService.getTrainingId(training_id, user_id);

    return res.status(HTTPSTATUS.OK).json({ 
      message: 'Trainig retrieved successfully.', 
      data: trainings 
  });
});

/**
 * @swagger
 * /base_path/base_url/training:
 *   get:
 *     summary: Get all trainings
 *     description: Retrieve all trainings for the authenticated user. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # Definição para o uso de tokens JWT
 *     responses:
 *       200:
 *         description: Successfully retrieved all trainings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Training retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67aa237243c9cdc23fed092d"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         example: "2025-02-10T16:04:02.329Z"
 *                       techniques:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Push-up", "Squats"]
 *                       durationMinutes:
 *                         type: integer
 *                         example: 30
 *                       intensityLevel:
 *                         type: string
 *                         example: "medium"
 *                       notes:
 *                         type: string
 *                         example: "Focado em resistência muscular"
 */


const getTrainings = asyncHandler(async (req, res) => {
      const user_id = req.user_id; 

      const trainings = await trainingService.getTrainings(user_id);
  
      return res.status(HTTPSTATUS.OK).json({ 
        message: 'Trainings retrieved successfully.', 
        data: trainings 
    });
});


/**
 * @swagger
 * /base_path/base_url/training/filter:
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
 *                       user_id:
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

const getTrainingsByFilter = async (req, res) => {
    const user_id = req.user_id; 
    const filters = req.trainingFilters;
    const trainings = await trainingService.getTrainigsByFilter(user_id, filters);
    return res.status(HTTPSTATUS.OK).json({
        message: 'Trainings Filter retrieved successfully.', 
        data: trainings 
    });
}


/**
 * @swagger
 * /base_path/base_url/goal/{goal_id}:
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
 *                     user_id:
 *                       type: string
 *                       example: "67a649c42ff750984cd49fe7"
 *                     _id:
 *                       type: string
 *                       example: "67aa22895d99240ada6de24c"
 *                     __v:
 *                       type: integer
 *                       example: 0
 */

const updateTraining = asyncHandler(async (req, res) => {
    const user_id = req.user_id;  
    const training_id = req.params.training_id; 
    const trainingData = req.validatedBody;  
         
    const updatedTraining = await trainingService.updateTrainig(training_id, user_id, trainingData);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Training updated successfully.',
        data: updatedTraining,
    });
})

/**
 * @swagger
 * /base_path/base_url/goal/{goal_id}:
 *   delete:
 *     summary: Delete an existing goal
 *     description: Deletes a specific goal for the authenticated user based on its unique ID. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # JWT token authentication
 *     parameters:
 *       - name: goal_id
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
    const user_id = req.user_id;  
    const goal_id = req.params.goal_id;   
         
    const updatedGoal = await goalService.deleteGoal(goal_id, user_id);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Goal delete successfully.',
    });
})
  

export default { 
    registerTraining , 
    getTrainings , 
    getTrainingId ,
    getTrainingsByFilter,
    updateTraining,
};

