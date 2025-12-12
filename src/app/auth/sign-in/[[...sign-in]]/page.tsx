import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
      </div>
      
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-slate-900/90 backdrop-blur-xl border border-white/10 shadow-2xl',
          },
        }}
        routing="path"
        path="/auth/sign-in"
        signUpUrl="/auth/sign-up"
        fallbackRedirectUrl="/dashboard/analyze"
      />
    </div>
  );
}