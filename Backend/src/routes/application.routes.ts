import { Router } from "express";
import { createApplication, listAllApplications, listMyApplications, updateApplication } from "../controllers/applications.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";

export const applicationRoutes = Router();

applicationRoutes.get("/", requireAuth, listMyApplications);
applicationRoutes.post("/", requireAuth, createApplication);
applicationRoutes.get("/admin/all", requireAuth, requireAdmin, listAllApplications);
applicationRoutes.patch("/:id", requireAuth, requireAdmin, updateApplication);
