import jwt from "jsonwebtoken";
import { HTTPSTATUS } from "../config/http.config.js";
import { config } from "../config/app.config.js";


const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Formato esperado: "Bearer <token>"

  if (!token) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Token não fornecido",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT.SECRET);
    req.user_id = decoded.user_id; // Armazena o user_id no request
    next();
  } catch (error) {
    return res.status(HTTPSTATUS.UNAUTHORIZED).json({
      message: "Token inválido",
    });
  }
};

export default authenticateToken;
