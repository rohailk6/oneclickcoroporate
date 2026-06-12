# Database Schema

The Prisma schema is located at `Backend/prisma/schema.prisma`.

## Models

Users:

- `id`
- `fullName`
- `email`
- `phoneNumber`
- `password`
- `createdAt`
- `role`

Company Applications:

- `userId`
- `companyName`
- `selectedState`
- `entityType`
- `applicationStatus`
- `submissionDate`
- `notes`

Documents:

- `userId`
- `fileName`
- `fileUrl`
- `uploadDate`
- `documentType`

Payments:

- `amount`
- `paymentStatus`
- `paymentDate`
- `transactionId`
- `invoiceNumber`

Enums cover roles, application status stages, entity type, supported states, and payment statuses.

