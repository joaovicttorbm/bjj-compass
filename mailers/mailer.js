import { config } from "../config/app.config.js";
import resendClient from "./resendClient.js";


const mailer_sender =
  config.NODE_ENV === "development"
    ? `no-reply <onboarding@resend.dev>`
    : `no-reply <${config.MAILER_SENDER}>`;

export const sendEmail = async ({ to, from = mailer_sender, subject, text, html }) => {
    console.info("E-mail enviado com sucesso!",  to, from = mailer_sender, subject, text, html);
    await resendClient.resend.emails.send({  
        from,
        to: Array.isArray(to) ? to : [to],
        text,
        subject,
        html,
    });

    console.info("E-mail enviado com sucesso!");
};
