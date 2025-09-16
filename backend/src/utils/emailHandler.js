import { createWelcomeEmailTemplate } from './emailTemplate.js';
import { resendClient, sender } from './resend.js';

const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: 'Welcome to Striv',
        html: createWelcomeEmailTemplate(name, clientURL),
    });

    if (error) {
        console.error(`Error sending welcome email: `, error);
        throw new Error(`Failed to send welcome email`);
    }

    console.log(`Welcome email sent successfully`, data);
};

export { sendWelcomeEmail };
