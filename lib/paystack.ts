import crypto from "crypto";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE = "https://api.paystack.co";

// ─────────────────────────────────────────
// Verify webhook signature (HMAC-SHA512)
// ─────────────────────────────────────────
export function verifyPaystackWebhook(
  rawBody: string,
  signature: string
): boolean {
  const hash = crypto
    .createHmac("sha512", PAYSTACK_SECRET)
    .update(rawBody)
    .digest("hex");
  return hash === signature;
}

// ─────────────────────────────────────────
// Initialize a transaction
// ─────────────────────────────────────────
export async function initializePaystackTransaction({
  email,
  amount,        // in kobo (multiply KES by 100)
  reference,
  metadata,
  callbackUrl,
}: {
  email: string;
  amount: number;
  reference: string;
  metadata?: Record<string, unknown>;
  callbackUrl: string;
}) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount,
      reference,
      metadata,
      callback_url: callbackUrl,
      currency: "KES",
    }),
  });

  const data = await res.json();

  if (!data.status) {
    throw new Error(data.message || "Paystack initialization failed");
  }

  return data.data as { authorization_url: string; access_code: string; reference: string };
}

// ─────────────────────────────────────────
// Verify a transaction
// ─────────────────────────────────────────
export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` },
  });

  const data = await res.json();

  if (!data.status) {
    throw new Error(data.message || "Paystack verification failed");
  }

  return data.data as {
    status: string;
    reference: string;
    amount: number;
    metadata: Record<string, unknown>;
  };
}
