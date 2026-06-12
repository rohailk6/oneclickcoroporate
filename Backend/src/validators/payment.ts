import { z } from "zod";

export const checkoutSchema = z.object({
  applicationId: z.string().optional(),
  amount: z.number().int().positive(),
  state: z.enum(["TEXAS", "NEW_YORK", "FLORIDA", "WYOMING"])
});
