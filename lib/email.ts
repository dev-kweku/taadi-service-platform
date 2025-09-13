    import nodemailer from 'nodemailer';

    export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    });

    export async function sendEmail({
    to,
    subject,
    html,
    }: {
    to: string;
    subject: string;
    html: string;
    }) {
    try {
        const info = await transporter.sendMail({
        from: `"Service Delivery" <${process.env.SMTP_FROM}>`,
        to,
        subject,
        html,
        });
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
    }