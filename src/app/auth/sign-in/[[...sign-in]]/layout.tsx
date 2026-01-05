import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Faça login na sua conta FollowerScan para acessar suas análises de seguidores do Instagram.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.followerscan.com/auth/sign-in',
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}