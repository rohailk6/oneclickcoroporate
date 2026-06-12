import { Router } from "express";
import { analytics } from "../controllers/admin.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const adminRoutes = Router();

adminRoutes.get("/analytics", requireAuth, requireAdmin, analytics);
