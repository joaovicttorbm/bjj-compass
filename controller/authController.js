import { HTTPSTATUS } from "../config/http.config.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authService from "../service/authService.js";


const login = asyncHandler ( async (req, res) => {
    const { email, password } = req.body;

    const { token } = await authService.authenticateUser(email, password);
    
    return res.status(HTTPSTATUS.OK).json({
        message: "Login bem-sucedido",
        token: token, 
    });
});

export default { login };