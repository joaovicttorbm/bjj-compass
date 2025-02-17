import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authService from "../service/authService.js";

/**
 * @swagger
 * /base_path/base_url/user/auth/login:
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
    const { email, password } = req.validatedBody;

    const { token } = await authService.authenticateUser(email, password);
    
    return res.status(HTTPSTATUS.OK).json({
        message: "Login Success",
        token: token, 
    });
});

/**
 * @swagger
 * /base_path/base_url/user/auth/forgot-password:
 *   post:
 *     summary: Request Password Reset
 *     description: Send a password reset link to the user's email.
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
 *     responses:
 *       200:
 *         description: Password reset link sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password reset email sent successfully."
 */

const forgotPassword = asyncHandler(async (req, res) => {
      const { resetToken } = await authService.requestPasswordReset(req.validatedBody.email);
      res.status(HTTPSTATUS.OK).json({
        mensage: "Password reset email sent successfully.",
        resetToken: resetToken,
    });;
  }
)

/**
 * @swagger
 * /base_path/base_url/user/auth/reset-password:
 *   post:
 *     summary: Reset User Password
 *     description: Reset the user's password using the provided reset token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNWQ2M2I5ZTg1YjM0MjhiY2QzM2Q3OSIsImlhdCI6MTYwMDM0Njc5OX0.j_4xsq8t_8MgGSO3Z5F79YF3wztfFtuSOJ-Jt0tO4X8"
 *               password:
 *                 type: string
 *                 example: "NewSecurePassword123!"
 *     responses:
 *       200:
 *         description: Password reset successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password has been successfully reset."
 */

const resetPassword = asyncHandler( async (req, res) => {
      const { token, newPassword } = req.validatedBody;
      await authService.resetPassword(token, newPassword);
      res.status(HTTPSTATUS.OK).json({
        mensage: "Update User Password"
    });
  }
)
export default { 
    login, 
    forgotPassword,
    resetPassword,
};