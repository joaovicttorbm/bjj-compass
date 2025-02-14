import { Resend } from "resend";
import { config } from "../config/app.config.js";

const resend = new Resend(config.RESEND_API_KEY);

export default { resend };
