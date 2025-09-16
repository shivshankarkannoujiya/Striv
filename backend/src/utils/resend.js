import { Resend } from "resend";
import "dotenv/config"

const resendClient = new Resend(process.env.RESEND_API_KEY)

const sender = {
    email: process.env.EMAIL_FROM,
    name: process.env.EMAIL_FROM_NAME
}

export { resendClient, sender }


