# Production Deployment Guide

## Frontend

Deploy `Frontend` to Vercel, Netlify, or any Node hosting platform.

Required environment variables:

```bash
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

## Backend

Deploy `Backend` to Render, Railway, Fly.io, AWS ECS, or any Node server.

Required environment variables are listed in `Backend/.env.example`.

Production commands:

```bash
npm install
npm run prisma:generate
npm run prisma:deploy
npm run build
npm run start
```

## Database

Use PostgreSQL 15+.

Create the database, set `DATABASE_URL`, then run:

```bash
cd Backend
npm run prisma:deploy
```

## Payments

`Backend/src/services/payment.service.ts` is provider-neutral. To use Stripe:

- Create a Stripe Checkout Session.
- Store the session id as `transactionId`.
- Add a webhook endpoint.
- Verify webhook signatures.
- Mark `Payment.paymentStatus` as `PAID` on successful checkout.

## Storage

Local storage is included for development. For production:

- Store files in S3/R2/GCS.
- Store only object keys and signed download URLs in the database.
- Enforce file size, MIME type, antivirus scanning, and role-based access.

## Security

- Use HTTPS only.
- Set `NODE_ENV=production`.
- Set `CORS_ORIGIN` to the frontend production domain.
- Use a long random `JWT_SECRET`.
- Keep cookies `httpOnly`, `sameSite=lax`, and `secure=true`.
- Move payment success to verified webhooks.
- Restrict `/uploads` or replace with signed URLs.

