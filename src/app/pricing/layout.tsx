import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Preços e Planos',
  description: 'Escolha o plano ideal do FollowerScan: Gratuito, Pro ou Business. Análises ilimitadas, detector de bloqueios, exportação PDF e muito mais. A partir de €4.99/mês.',
  keywords: [
    'followerscan preços',
    'planos instagram analytics',
    'análise seguidores preço',
    'ferramenta instagram grátis',
    'detector bloqueios instagram preço',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com/pricing',
  },
  openGraph: {
    title: 'Preços e Planos | FollowerScan',
    description: 'Planos a partir de €4.99/mês. Análises ilimitadas, detector de bloqueios e exportação PDF.',
    url: 'https://www.followerscan.com/pricing',
    images: [
      {
        url: '/og-pricing.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Preços e Planos',
      },
    ],
  },
  twitter: {
    title: 'Preços e Planos | FollowerScan',
    description: 'Planos a partir de €4.99/mês. Análises ilimitadas e detector de bloqueios.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}