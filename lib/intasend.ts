const INTASEND_API_KEY = process.env.INTASEND_API_KEY!;
const INTASEND_BASE = process.env.NODE_ENV === "production"
  ? "https://payment.intasend.com/api/v1"
  : "https://sandbox.intasend.com/api/v1";

// ─────────────────────────────────────────
// Initiate STK Push (M-Pesa prompt on phone)
// ─────────────────────────────────────────
export async function initiateMpesaStkPush({
  phone,
  amount,
  email,
  narrative,
  reference,
}: {
  phone: string;   // format: 2547XXXXXXXX
  amount: number;  // KES
  email: string;
  narrative: string;
  reference: string;
}) {
  const res = await fetch(`${INTASEND_BASE}/payment/mpesa-stk-push/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INTASEND_API_KEY}`,
    },
    body: JSON.stringify({
      phone_number: phone,
      amount,
      email,
      narrative,
      api_ref: reference,
    }),
  });

  const data = await res.json();

  if (data.errors || !data.invoice) {
    throw new Error(data.errors?.[0] || "IntaSend STK push failed");
  }

  return data as {
    invoice: { invoice_id: string; state: string; net_amount: number };
  };
}

// ─────────────────────────────────────────
// Check payment status
// ─────────────────────────────────────────
export async function checkIntasendPaymentStatus(invoiceId: string) {
  const res = await fetch(`${INTASEND_BASE}/payment/status/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${INTASEND_API_KEY}`,
    },
    body: JSON.stringify({ invoice_id: invoiceId }),
  });

  const data = await res.json();
  return data as { invoice: { state: string; invoice_id: string } };
}
