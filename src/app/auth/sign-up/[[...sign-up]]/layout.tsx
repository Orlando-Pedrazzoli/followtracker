import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta Grátis',
  description: 'Crie sua conta gratuita no FollowerScan e comece a analisar seus seguidores do Instagram. Descubra quem não te segue de volta em minutos.',
  keywords: [
    'criar conta followerscan',
    'registar followerscan',
    'análise instagram grátis',
    'conta grátis instagram analytics',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://www.followerscan.com/auth/sign-up',
  },
  openGraph: {
    title: 'Criar Conta Grátis | FollowerScan',
    description: 'Crie sua conta gratuita e descubra quem não te segue de volta no Instagram.',
    url: 'https://www.followerscan.com/auth/sign-up',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Criar Conta Grátis',
      },
    ],
  },
  twitter: {
    title: 'Criar Conta Grátis | FollowerScan',
    description: 'Crie sua conta gratuita e descubra quem não te segue de volta.',
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}