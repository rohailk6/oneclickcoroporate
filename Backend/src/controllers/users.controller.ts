import bcrypt from "bcryptjs";
import type { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.js";

const profileSchema = z.object({
  fullName: z.string().min(2).optional(),
  phoneNumber: z.string().min(7).optional()
});

const passwordSchema = z.object({
  currentPassword: z.string().min(8),
  newPassword: z.string().min(8)
});

export async function updateProfile(req: Request, res: Response) {
  const input = profileSchema.parse(req.body);
  const user = await prisma.user.update({
    where: { id: req.user!.id },
    data: input,
    select: { id: true, fullName: true, email: true, phoneNumber: true, role: true }
  });
  return res.json({ user });
}

export async function changePassword(req: Request, res: Response) {
  const input = passwordSchema.parse(req.body);
  const user = await prisma.user.findUniqueOrThrow({ where: { id: req.user!.id } });
  if (!(await bcrypt.compare(input.currentPassword, user.password))) {
    return res.status(400).json({ message: "Current password is incorrect" });
  }
  await prisma.user.update({ where: { id: user.id }, data: { password: await bcrypt.hash(input.newPassword, 12) } });
  return res.json({ message: "Password changed" });
}

export async function listUsers(req: Request, res: Response) {
  const search = String(req.query.search ?? "");
  const users = await prisma.user.findMany({
    where: search
      ? {
          OR: [
            { fullName: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } }
          ]
        }
      : undefined,
    select: { id: true, fullName: true, email: true, phoneNumber: true, role: true, createdAt: true },
    orderBy: { createdAt: "desc" }
  });
  return res.json({ users });
}
