import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Perguntas Frequentes (FAQ)',
  description: 'Tire suas dúvidas sobre o FollowerScan. Saiba como funciona, se é seguro, como exportar dados do Instagram, planos, pagamentos e muito mais.',
  keywords: [
    'followerscan faq',
    'followerscan é seguro',
    'como funciona followerscan',
    'análise instagram segura',
    'dúvidas followerscan',
    'perguntas seguidores instagram',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com/faq',
  },
  openGraph: {
    title: 'FAQ - Perguntas Frequentes | FollowerScan',
    description: 'Encontre respostas para todas as suas dúvidas sobre o FollowerScan e análise de seguidores Instagram.',
    url: 'https://www.followerscan.com/faq',
    images: [
      {
        url: '/og-faq.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Perguntas Frequentes',
      },
    ],
  },
  twitter: {
    title: 'FAQ | FollowerScan',
    description: 'Respostas para todas as suas dúvidas sobre análise de seguidores Instagram.',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}