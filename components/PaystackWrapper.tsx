"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// This forces the button to ONLY load in the browser, fixing 'window is not defined'
const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), {
  ssr: false,
  loading: () => <button className="bg-gray-700 text-gray-400 w-full py-3 rounded font-bold flex justify-center"><Loader2 className="animate-spin"/></button>,
});

export default function PaystackWrapper(props: any) {
  return <PaystackButton {...props} />;
}
