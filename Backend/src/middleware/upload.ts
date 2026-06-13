import os from "node:os";
import path from "node:path";
import multer from "multer";
import { env } from "../config/env.js";

export const uploadDir = process.env.VERCEL ? path.join(os.tmpdir(), env.UPLOAD_DIR) : env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    cb(null, `${Date.now()}-${safeName}`);
  }
});

export const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
    cb(null, allowed.includes(file.mimetype));
  }
});
