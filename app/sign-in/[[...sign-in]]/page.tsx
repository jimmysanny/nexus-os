import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#020817] py-12">
      <div className="mb-8 text-center">
        <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
          <span className="text-white font-bold text-xl">N</span>
        </div>
        <h1 className="text-2xl font-bold text-white">Welcome back to Nexus OS</h1>
      </div>
      <SignIn appearance={{
        elements: {
          formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          footerActionLink: 'text-indigo-400 hover:text-indigo-300',
          card: 'bg-[#0B0F1A] border border-slate-800 shadow-xl',
          headerTitle: 'text-white',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton: 'bg-slate-900 border-slate-800 text-white hover:bg-slate-800',
          socialButtonsBlockButtonText: 'text-white',
          formFieldLabel: 'text-slate-300',
          formFieldInput: 'bg-slate-900 border-slate-700 text-white',
          footer: 'bg-[#0B0F1A]'
        }
      }} />
    </div>
  );
}