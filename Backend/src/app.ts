import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { env } from "./config/env.js";
import { sanitizeBody } from "./middleware/sanitize.js";
import { adminRoutes } from "./routes/admin.routes.js";
import { applicationRoutes } from "./routes/application.routes.js";
import { authRoutes } from "./routes/auth.routes.js";
import { documentRoutes } from "./routes/document.routes.js";
import { paymentRoutes } from "./routes/payment.routes.js";
import { userRoutes } from "./routes/user.routes.js";

export const app = express();

app.use((helmet as unknown as () => express.RequestHandler)());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || origin === env.CORS_ORIGIN || /^http:\/\/localhost:\d+$/.test(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(sanitizeBody);
app.use((rateLimit as unknown as (options: Record<string, unknown>) => express.RequestHandler)({ windowMs: 15 * 60 * 1000, limit: 150, standardHeaders: true, legacyHeaders: false }));
app.use("/uploads", express.static(path.resolve(env.UPLOAD_DIR)));

const csrfProtection = csrf({ cookie: { httpOnly: true, sameSite: "lax", secure: env.NODE_ENV === "production" } });
app.get("/api/csrf-token", csrfProtection, (req, res) => res.json({ csrfToken: req.csrfToken() }));

app.get("/health", (_req, res) => res.json({ ok: true, service: "oneclick-corporate-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.use((err: Error & { status?: number }, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  return res.status(err.status ?? 500).json({ message: err.message ?? "Internal server error" });
});
