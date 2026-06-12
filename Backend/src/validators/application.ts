import { z } from "zod";

export const applicationSchema = z.object({
  companyName: z.string().min(2),
  selectedState: z.enum(["TEXAS", "NEW_YORK", "FLORIDA", "WYOMING"]),
  entityType: z.literal("LLC").default("LLC"),
  notes: z.string().optional(),
  industry: z.string().optional(),
  businessPurpose: z.string().optional()
});

export const updateApplicationSchema = z.object({
  applicationStatus: z.enum(["SUBMITTED", "IN_REVIEW", "FILING_IN_PROGRESS", "COMPLETED"]).optional(),
  notes: z.string().optional()
});
