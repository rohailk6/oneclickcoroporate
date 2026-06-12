import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { saveCloudReadyMetadata } from "../services/storage.service.js";

export async function uploadDocument(req: Request, res: Response) {
  if (!req.file) return res.status(400).json({ message: "File is required" });
  const documentType = String(req.body.documentType ?? "general");
  const storage = await saveCloudReadyMetadata(req.file.filename);
  const document = await prisma.document.create({
    data: {
      userId: req.user!.id,
      fileName: req.file.originalname,
      fileUrl: storage.url,
      documentType,
      mimeType: req.file.mimetype,
      size: req.file.size
    }
  });
  return res.status(201).json({ document });
}

export async function listMyDocuments(req: Request, res: Response) {
  const documents = await prisma.document.findMany({ where: { userId: req.user!.id }, orderBy: { uploadDate: "desc" } });
  return res.json({ documents });
}

export async function listAllDocuments(_req: Request, res: Response) {
  const documents = await prisma.document.findMany({
    include: { user: { select: { id: true, fullName: true, email: true } } },
    orderBy: { uploadDate: "desc" }
  });
  return res.json({ documents });
}

export async function downloadDocument(req: Request, res: Response) {
  const document = await prisma.document.findUnique({ where: { id: String(req.params.id) } });
  if (!document) return res.status(404).json({ message: "Document not found" });
  if (document.userId !== req.user!.id && req.user!.role !== "ADMIN") {
    return res.status(403).json({ message: "Access denied" });
  }
  return res.redirect(document.fileUrl);
}
