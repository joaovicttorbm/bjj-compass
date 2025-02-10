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
    const newTraining = await trainingService.createTrainingService(req.validatedBody);

    return res.status(HTTPSTATUS.CREATED).json({
        message: "Training registered successfully",
        data: newTraining, 
    });
});

export default { registerTraining };