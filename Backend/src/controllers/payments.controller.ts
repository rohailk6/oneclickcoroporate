import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { checkoutSchema } from "../validators/payment.js";
import { createCheckoutIntent, createInvoiceNumber } from "../services/payment.service.js";

const prices = { TEXAS: 390, NEW_YORK: 340, FLORIDA: 320, WYOMING: 250 };

export async function createCheckout(req: Request, res: Response) {
  const input = checkoutSchema.parse(req.body);
  if (prices[input.state] !== input.amount) return res.status(400).json({ message: "Invalid package amount" });

  const intent = await createCheckoutIntent({ amount: input.amount, userId: req.user!.id, state: input.state });
  const payment = await prisma.payment.create({
    data: {
      userId: req.user!.id,
      applicationId: input.applicationId,
      amount: input.amount,
      paymentStatus: "PENDING",
      transactionId: intent.transactionId,
      invoiceNumber: createInvoiceNumber()
    }
  });
  return res.status(201).json({ checkout: intent, payment });
}

export async function markPaymentSuccess(req: Request, res: Response) {
  const payment = await prisma.payment.update({
    where: { id: String(req.params.id) },
    data: { paymentStatus: "PAID", paymentDate: new Date() }
  });
  return res.json({ payment });
}

export async function listMyPayments(req: Request, res: Response) {
  const payments = await prisma.payment.findMany({ where: { userId: req.user!.id }, orderBy: { paymentDate: "desc" } });
  return res.json({ payments });
}

export async function listAllPayments(_req: Request, res: Response) {
  const payments = await prisma.payment.findMany({
    include: { user: { select: { id: true, fullName: true, email: true } }, application: true },
    orderBy: { paymentDate: "desc" }
  });
  return res.json({ payments });
}
