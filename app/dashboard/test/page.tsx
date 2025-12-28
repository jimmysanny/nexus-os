import { currentUser } from "@clerk/nextjs/server";
import { sendReceiptEmail } from "@/lib/email";
import { redirect } from "next/navigation";

export default async function TestEmailPage({ searchParams }: { searchParams: Promise<{ sent?: string }> }) {
  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress || "jimmysanny01@gmail.com";
  
  // Await searchParams for Next.js 15
  const params = await searchParams;
  const wasSent = params?.sent === "true";

  async function triggerTestEmail() {
    "use server";
    console.log("Sending test email to:", email);
    
    // Send a fake receipt for KES 1,000
    await sendReceiptEmail(email, 1000, "TEST-REF-" + Date.now());
    
    redirect("/dashboard/test?sent=true");
  }

  return (
    <div className="p-8 max-w-xl text-white">
      <h1 className="text-3xl font-bold mb-4">System Email Tester</h1>
      <p className="text-slate-400 mb-8">
        This tool forces the Resend system to send a receipt to: <br/>
        <span className="text-indigo-400 font-mono">{email}</span>
      </p>

      {wasSent ? (
        <div className="bg-green-900/30 text-green-400 p-4 rounded-xl border border-green-800 mb-6">
           <strong>Email Sent!</strong> Check your inbox (and spam folder).
        </div>
      ) : null}

      <form action={triggerTestEmail}>
        <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/20">
            Send Test Receipt Now
        </button>
      </form>
    </div>
  );
}