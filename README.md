# OneClick Corporate

Production-ready full-stack SaaS scaffold for US LLC formation services.

## Apps

- `Frontend`: Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, dark/light mode, responsive SaaS UI.
- `Backend`: Node.js, Express, PostgreSQL, Prisma ORM, JWT auth, file uploads, email hooks, payment architecture.

## Services

- Texas LLC Formation: `$390`
- New York LLC Formation: `$340`
- Florida LLC Formation: `$320`
- Wyoming LLC Formation: `$250`

## Quick Start

1. Install dependencies:

```bash
cd Backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

2. Start the frontend:

```bash
cd Frontend
npm install
cp .env.example .env.local
npm run dev
```

3. Open:

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:4000/health`

## Core Routes

Frontend:

- `/`
- `/pricing`
- `/register-company`
- `/register-company/success`
- `/auth/login`
- `/auth/register`
- `/forgot-password`
- `/verify-email`
- `/dashboard`
- `/admin`
- `/checkout/success`

Backend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/auth/verify-email`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/applications`
- `POST /api/applications`
- `GET /api/applications/admin/all`
- `PATCH /api/applications/:id`
- `GET /api/documents`
- `POST /api/documents`
- `GET /api/documents/admin/all`
- `GET /api/payments`
- `POST /api/payments/checkout`
- `POST /api/payments/:id/success`
- `GET /api/admin/analytics`

## Architecture Notes

- Prisma models include users, company applications, documents, and payments.
- Documents are stored locally by default with cloud-storage-ready metadata helpers.
- Payments create provider-neutral checkout intents and invoice numbers, ready for Stripe wiring.
- Email verification and password reset are implemented through Nodemailer.
- Security includes Helmet, CORS, rate limiting, secure password hashing, JWT sessions, input sanitization, protected routes, upload validation, and CSRF token endpoint.

## Production Checklist

- Use managed PostgreSQL and set `DATABASE_URL`.
- Set a 32+ character `JWT_SECRET`.
- Configure SMTP credentials.
- Replace local storage with S3-compatible storage in `storage.service.ts`.
- Wire `payment.service.ts` to Stripe Checkout or your provider of choice.
- Add webhook signature verification for payment success.
- Serve uploads through signed URLs instead of public static paths.
- Enable HTTPS, secure cookies, and production CORS origins.
- Run migrations with `npm run prisma:deploy`.

