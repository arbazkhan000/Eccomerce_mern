import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

if (
    !process.env.EMAIL_USER ||
    !process.env.EMAIL_PASS ||
    !process.env.FRONTEND_URL
) {
    throw new Error("Missing required environment variables");
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.log(
            "❌ Gmail service is not ready. Please verify email credentials."
        );
    } else {
        console.log("✅ Gmail service is ready to send emails.");
    }
});

const sendEmail = async (
    to: string,
    subject: string,
    body: string
): Promise<void> => {
    try {
        await transporter.sendMail({
            from: `Luxe <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: body,
        });
        console.log(`✅ Email sent to ${to}`);
    } catch (error) {
        console.error("❌ Failed to send email:", (error as Error).message);
    }
};

export const sendVerificationToEmail = async (
    to: string,
    token: string
): Promise<void> => {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 8px; padding: 24px;">
      <h2 style="color: #333;">Verify Your Email Address</h2>
      <p>Thank you for registering with Luxe!</p>
      <p>Please click the button below to verify your email address and complete your registration:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-weight: bold;">Verify Email</a>
      <p style="margin-top: 24px; color: #888;">If you did not create an account, you can safely ignore this email.</p>
      <p style="margin-top: 24px; color: #888;">&copy; ${new Date().getFullYear()} Luxe. All rights reserved.</p>
    </div>
  `;

    await sendEmail(to, "Please verify your email to access Luxe", html);
};
