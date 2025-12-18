"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false, loading: () => <button className="w-full py-3 bg-gray-800 rounded text-white"><Loader2 className="animate-spin mx-auto"/></button> }
);

export default function PaystackWrapper({ email, amount }: any) {
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "";
  const componentProps = {
    email,
    amount: amount * 100, // Convert KES to cents
    publicKey,
    text: "Pay Now " + amount + " KES",
    onSuccess: () => alert("✅ Payment Successful! Money Received."),
    onClose: () => alert("Transaction Cancelled"),
  };

  if (!publicKey) return <div className="text-red-400 text-sm border border-red-500 p-2 rounded">⚠️ Missing API Key</div>;

  return (
    <div className="w-full my-4">
       <PaystackButton {...componentProps} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg shadow transition" />
    </div>
  );
}
