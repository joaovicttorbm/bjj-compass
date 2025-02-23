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
 *                     userId:
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
 * /base_path/base_url/training/{trainingId}:
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
    const userId = req.userId; 
    const { trainingId } = req.params; 
    const trainings = await trainingService.getTrainingId(trainingId, userId);

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
      const userId = req.userId; 

      const trainings = await trainingService.getTrainings(userId);
  
      return res.status(HTTPSTATUS.OK).json({ 
        message: 'Trainings retrieved successfully.', 
        data: trainings 
    });
});


/**
 * @swagger
 * /base_path/base_url/training/filter:
 *   get:
 *     summary: Get training sessions for the authenticated user
 *     description: Retrieve a list of training sessions for the authenticated user. You can apply optional filters for date range, intensity level, duration, and techniques.
 *     parameters:
 *       - in: query
 *         name: dateFrom
 *         required: false
 *         description: Start date for filtering training sessions.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-01"
 *       - in: query
 *         name: dateTo
 *         required: false
 *         description: End date for filtering training sessions.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2024-01-02"
 *       - in: query
 *         name: intensityLevel
 *         required: false
 *         description: Filter by intensity level (low, medium, high).
 *         schema:
 *           type: string
 *           example: "high"
 *       - in: query
 *         name: durationMin
 *         required: false
 *         description: Minimum duration in minutes.
 *         schema:
 *           type: integer
 *           example: 30
 *       - in: query
 *         name: durationMax
 *         required: false
 *         description: Maximum duration in minutes.
 *         schema:
 *           type: integer
 *           example: 120
 *       - in: query
 *         name: techniques
 *         required: false
 *         description: Filter by training techniques.
 *         schema:
 *           type: string
 *           example: "guard passing"
 *     security:
 *       - bearerAuth: []  # JWT Authentication
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of training sessions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Training sessions retrieved successfully."
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "67aa22895d99240ada6de24c"
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2024-01-02T12:30:00Z"
 *                       intensityLevel:
 *                         type: string
 *                         example: "high"
 *                       durationMinutes:
 *                         type: integer
 *                         example: 60
 *                       techniques:
 *                         type: string
 *                         example: "guard passing"
 *                       notes:
 *                         type: string
 *                         example: "Focused on guard passing techniques."
 */


const getTrainingsByFilter = async (req, res) => {
    const userId = req.userId; 
    const filters = req.trainingFilters;
    const trainings = await trainingService.getTrainigsByFilter(userId, filters);
    return res.status(HTTPSTATUS.OK).json({
        message: 'Trainings Filter retrieved successfully.', 
        data: trainings 
    });
}


/**
 * @swagger
 * /base_path/base_url/goal/{trainingId}:
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

const updateTraining = asyncHandler(async (req, res) => {
    const userId = req.userId;  
    const trainingId = req.params.trainingId; 
    const trainingData = req.validatedBody;  
         
    const updatedTraining = await trainingService.updateTrainig(trainingId, userId, trainingData);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Training updated successfully.',
        data: updatedTraining,
    });
})

/**
 * @swagger
 * /base_path/base_url/training/{trainingId}:
 *   delete:
 *     summary: Delete an existing training session
 *     description: Deletes a specific training session for the authenticated user based on its unique ID. The user ID is automatically extracted from the authentication token.
 *     security:
 *       - bearerAuth: []  # JWT token authentication
 *     parameters:
 *       - name: trainingId
 *         in: path
 *         required: true
 *         description: The ID of the training session to delete
 *         schema:
 *           type: string
 *           example: "67aa22895d99240ada6de24c"
 *     responses:
 *       200:
 *         description: Training session deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Training session deleted successfully."
 */


const deleteTraining = asyncHandler(async (req, res) => {
    const userId = req.userId;  
    const trainingId = req.params.trainingId;   
         
    const updatedTraining = await trainingService.deleteTrainig(trainingId, userId);
    
    return res.status(HTTPSTATUS.OK).json({
        message: 'Training delete successfully.',
    });
})
  

export default { 
    registerTraining , 
    getTrainings , 
    getTrainingId ,
    getTrainingsByFilter,
    updateTraining,
    deleteTraining,
};

