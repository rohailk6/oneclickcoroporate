import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = env.SMTP_HOST
  ? nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ?? 587,
      secure: false,
      auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined
    })
  : null;

export async function sendEmail(to: string, subject: string, html: string) {
  if (!transporter) {
    console.info(`[email:dev] ${subject} -> ${to}`);
    return;
  }

  await transporter.sendMail({ from: env.EMAIL_FROM, to, subject, html });
}

export function verificationEmail(token: string) {
  return `<p>Verify your OneClick Corporate account:</p><p><a href="${env.APP_URL}/verify-email?token=${token}">Verify email</a></p>`;
}

export function resetPasswordEmail(token: string) {
  return `<p>Reset your password:</p><p><a href="${env.APP_URL}/forgot-password?token=${token}">Reset password</a></p>`;
}
