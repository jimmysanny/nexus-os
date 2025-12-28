import { SignIn } from '@clerk/nextjs';
export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black'>
      <SignIn appearance={{ elements: { formButtonPrimary: 'bg-indigo-600' } }} />
    </div>
  );
}
