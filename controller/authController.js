import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authService from "../service/authService.js";

/**
 * @swagger
 * /base_path/base_url/auth/login:
 *   post:
 *     summary: User Login
 *     description: Authenticate user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user1234@gmail.com
 *               password:
 *                 type: string
 *                 example: user1234
 *     responses:
 *       200:
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login bem-sucedido"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWQ2M2I5ZTg1YjM0MjhiY2QzM2Q3OSIsImlhdCI6MTYwMDM0Njc5OX0.j_4xsq8t_8MgGSO3Z5F79YF3wztfFtuSOJ-Jt0tO4X8"
 */

const login = asyncHandler ( async (req, res) => {
    const { email, password } = req.body;

    const { token } = await authService.authenticateUser(email, password);
    
    return res.status(HTTPSTATUS.OK).json({
        message: "Login bem-sucedido",
        token: token, 
    });
});

export default { login };