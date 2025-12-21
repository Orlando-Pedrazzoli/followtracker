import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exemplo de Análise',
  description: 'Veja um exemplo real de análise do FollowerScan. Descubra quem não te segue de volta, bloqueios detectados, unfollows recentes e insights sobre seus seguidores.',
  keywords: [
    'exemplo análise instagram',
    'demo followerscan',
    'ver quem não me segue exemplo',
    'análise seguidores demo',
    'followerscan exemplo',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com/sample',
  },
  openGraph: {
    title: 'Exemplo de Análise de Seguidores | FollowerScan',
    description: 'Veja como funciona uma análise completa de seguidores do Instagram com o FollowerScan.',
    url: 'https://www.followerscan.com/sample',
    images: [
      {
        url: '/og-sample.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Exemplo de Análise',
      },
    ],
  },
  twitter: {
    title: 'Exemplo de Análise | FollowerScan',
    description: 'Veja um exemplo real de análise de seguidores do Instagram.',
  },
};

export default function SampleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}