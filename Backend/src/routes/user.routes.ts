import { Router } from "express";
import { changePassword, listUsers, updateProfile } from "../controllers/users.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const userRoutes = Router();

userRoutes.patch("/profile", requireAuth, updateProfile);
userRoutes.post("/change-password", requireAuth, changePassword);
userRoutes.get("/admin/all", requireAuth, requireAdmin, listUsers);
