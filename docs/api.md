# API Reference

Base URL: `/api`

## Authentication

`POST /auth/register`

```json
{
  "fullName": "Rohail Nawaz",
  "email": "rohail@example.com",
  "phoneNumber": "+1 555 0100",
  "password": "securepassword"
}
```

`POST /auth/login`

```json
{
  "email": "rohail@example.com",
  "password": "securepassword"
}
```

Use the returned JWT in:

```http
Authorization: Bearer <token>
```

## Applications

`POST /applications`

```json
{
  "companyName": "Atlas Ledger LLC",
  "selectedState": "WYOMING",
  "entityType": "LLC",
  "industry": "Software",
  "businessPurpose": "SaaS product development",
  "notes": "Please confirm name availability."
}
```

Admin status update:

`PATCH /applications/:id`

```json
{
  "applicationStatus": "FILING_IN_PROGRESS",
  "notes": "Filed with state office."
}
```

## Documents

`POST /documents`

Multipart form fields:

- `file`
- `documentType`

`GET /documents/:id/download`

Returns a protected redirect to the stored document URL for the owner or an admin.

## Payments

`POST /payments/checkout`

```json
{
  "applicationId": "optional-application-id",
  "state": "WYOMING",
  "amount": 250
}
```

## Admin

`GET /admin/analytics`

Returns revenue, order count, user count, application count, and document count.
