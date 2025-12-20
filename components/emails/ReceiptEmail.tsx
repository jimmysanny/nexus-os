import * as React from "react";

interface ReceiptEmailProps {
  productName: string;
  price: number;
  downloadUrl: string;
  orderId: string;
}

export const ReceiptEmail: React.FC<Readonly<ReceiptEmailProps>> = ({
  productName, price, downloadUrl, orderId
}) => (
  <div style={{ fontFamily: "sans-serif", padding: "40px", backgroundColor: "#f8fafc" }}>
    <div style={{ maxWidth: "500px", margin: "0 auto", backgroundColor: "#ffffff", padding: "40px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
      <h1 style={{ color: "#0f172a", fontSize: "24px", fontWeight: "900", margin: "0 0 20px" }}>Order Confirmed</h1>
      <p style={{ color: "#64748b", fontSize: "14px", margin: "0 0 30px" }}>
        Thank you for your purchase. Your digital asset is secured and ready for download.
      </p>
      
      <div style={{ backgroundColor: "#f1f5f9", padding: "20px", borderRadius: "12px", marginBottom: "30px" }}>
        <p style={{ margin: "0 0 10px", fontWeight: "bold", color: "#334155" }}>{productName}</p>
        <p style={{ margin: "0", color: "#94a3b8", fontSize: "12px" }}>Order #{orderId}  KES {price}</p>
      </div>

      <a href={downloadUrl} style={{ display: "block", backgroundColor: "#2563eb", color: "#ffffff", padding: "16px", borderRadius: "8px", textDecoration: "none", textAlign: "center", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px", letterSpacing: "1px" }}>
        Download Asset
      </a>
      
      <p style={{ marginTop: "30px", fontSize: "10px", color: "#cbd5e1", textAlign: "center" }}>
        Secured by Nexus OS. If the button does not work, copy this link: {downloadUrl}
      </p>
    </div>
  </div>
);