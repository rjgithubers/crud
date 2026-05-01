import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  requireTLS: true,
  auth: {
    type: "LOGIN",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
} as any);

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      ...options,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send verification email");
  }
}

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  const verificationLink = `http://localhost:8000/api/auth/v1/verify-email?token=${verificationToken}&email=${email}`;

  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
      <h2>Email Verification</h2>
      <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
      <a href="${verificationLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 16px 0;">Verify Email</a>
      <p>Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all; color: #666;">${verificationLink}</p>
      <p style="color: #888; font-size: 12px;">This link will expire in 24 hours.</p>
    </div>
  `;

  await sendEmail({
    to: email,
    subject: "Verify your email address",
    html,
  });
}