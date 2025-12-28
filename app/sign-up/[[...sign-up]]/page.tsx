import { SignUp } from '@clerk/nextjs';
export default function Page() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black'>
      <SignUp appearance={{ elements: { formButtonPrimary: 'bg-indigo-600' } }} />
    </div>
  );
}
