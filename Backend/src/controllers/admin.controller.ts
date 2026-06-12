import type { Response } from "express";
import { prisma } from "../config/prisma.js";

export async function analytics(_req: unknown, res: Response) {
  const [users, applications, payments, documents] = await Promise.all([
    prisma.user.count(),
    prisma.companyApplication.count(),
    prisma.payment.findMany({ where: { paymentStatus: "PAID" }, select: { amount: true } }),
    prisma.document.count()
  ]);

  return res.json({
    users,
    applications,
    documents,
    revenue: payments.reduce((total, payment) => total + payment.amount, 0),
    orders: payments.length
  });
}
