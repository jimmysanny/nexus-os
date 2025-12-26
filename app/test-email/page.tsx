'use client'
import { useState } from 'react'
import { sendTestEmail } from './action'

export default function TestEmailPage() {
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true); setStatus("");
    const result = await sendTestEmail(formData);
    setStatus(result.message);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">System Check</h1>
        <p className="text-gray-500 mb-6 text-sm">Verify email delivery for <strong>nexusos.africa</strong></p>
        
        <form action={handleSubmit} className="space-y-4">
          <input name="email" type="email" required placeholder="Enter your personal email..." className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black outline-none" />
          <button disabled={loading} className="w-full bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50 transition">
            {loading ? "Sending..." : "Send Test Email"}
          </button>
        </form>

        {status && (
          <div className={`mt-6 p-4 rounded-lg text-sm font-medium text-center ${status.includes("Sent") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  )
}
