import { Router } from "express";
import { downloadDocument, listAllDocuments, listMyDocuments, uploadDocument } from "../controllers/documents.controller.js";
import { requireAdmin, requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";

export const documentRoutes = Router();

documentRoutes.get("/", requireAuth, listMyDocuments);
documentRoutes.post("/", requireAuth, upload.single("file"), uploadDocument);
documentRoutes.get("/:id/download", requireAuth, downloadDocument);
documentRoutes.get("/admin/all", requireAuth, requireAdmin, listAllDocuments);
