export function createInvoiceNumber() {
  return `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

export async function createCheckoutIntent(input: { amount: number; userId: string; state: string }) {
  return {
    provider: process.env.PAYMENT_PROVIDER ?? "stripe",
    checkoutUrl: `${process.env.APP_URL ?? "http://localhost:3000"}/checkout/success`,
    transactionId: `txn_${input.state.toLowerCase()}_${Date.now()}`,
    amount: input.amount
  };
}
