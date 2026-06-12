import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { env } from "../config/env.js";
import { forgotPasswordSchema, loginSchema, registerSchema, resetPasswordSchema } from "../validators/auth.js";
import { randomToken, signToken } from "../utils/tokens.js";
import { resetPasswordEmail, sendEmail, verificationEmail } from "../services/email.service.js";

export async function register(req: Request, res: Response) {
  try {
    const input = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) return res.status(409).json({ message: "Email is already registered" });

    const verificationToken = randomToken();
    const user = await prisma.user.create({
      data: {
        fullName: input.fullName,
        email: input.email,
        phoneNumber: input.phoneNumber,
        password: await bcrypt.hash(input.password, 12),
        verificationToken
      },
      select: { id: true, fullName: true, email: true, role: true }
    });

    await sendEmail(user.email, "Verify your OneClick Corporate account", verificationEmail(verificationToken));
    const token = signToken(user);
    res.cookie("token", token, cookieOptions());
    return res.status(201).json({ user, token });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Registration failed";
    const status = (err as any)?.status ?? 400;
    return res.status(status).json({ message: msg });
  }
}

export async function login(req: Request, res: Response) {
  const input = loginSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || !(await bcrypt.compare(input.password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user);
  res.cookie("token", token, cookieOptions());
  return res.json({
    user: { id: user.id, fullName: user.fullName, email: user.email, role: user.role },
    token
  });
}

export async function me(req: Request, res: Response) {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.id },
    select: { id: true, fullName: true, email: true, phoneNumber: true, role: true, emailVerifiedAt: true, createdAt: true }
  });
  return res.json({ user });
}

export async function verifyEmail(req: Request, res: Response) {
  const token = String(req.query.token ?? "");
  const user = await prisma.user.findFirst({ where: { verificationToken: token } });
  if (!user) return res.status(400).json({ message: "Invalid verification token" });
  await prisma.user.update({ where: { id: user.id }, data: { emailVerifiedAt: new Date(), verificationToken: null } });
  return res.json({ message: "Email verified" });
}

export async function forgotPassword(req: Request, res: Response) {
  const input = forgotPasswordSchema.parse(req.body);
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (user) {
    const token = randomToken();
    await prisma.user.update({
      where: { id: user.id },
      data: { resetPasswordToken: token, resetPasswordExpires: new Date(Date.now() + 60 * 60 * 1000) }
    });
    await sendEmail(user.email, "Reset your OneClick Corporate password", resetPasswordEmail(token));
  }
  return res.json({ message: "If the email exists, a reset link has been sent" });
}

export async function resetPassword(req: Request, res: Response) {
  const input = resetPasswordSchema.parse(req.body);
  const user = await prisma.user.findFirst({
    where: { resetPasswordToken: input.token, resetPasswordExpires: { gt: new Date() } }
  });
  if (!user) return res.status(400).json({ message: "Invalid reset token" });
  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(input.password, 12), resetPasswordToken: null, resetPasswordExpires: null }
  });
  return res.json({ message: "Password updated" });
}

export function logout(_req: Request, res: Response) {
  res.clearCookie("token");
  return res.json({ message: "Logged out" });
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000
  };
}
