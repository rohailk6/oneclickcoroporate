import { Router } from "express";
import { createCheckout, listAllPayments, listMyPayments, markPaymentSuccess } from "../controllers/payments.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const paymentRoutes = Router();

paymentRoutes.get("/", requireAuth, listMyPayments);
paymentRoutes.post("/checkout", requireAuth, createCheckout);
paymentRoutes.post("/:id/success", requireAuth, markPaymentSuccess);
paymentRoutes.get("/admin/all", requireAuth, requireAdmin, listAllPayments);
