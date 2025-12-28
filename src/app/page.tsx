import type { Metadata } from 'next';
import HomeClient from '@/components/home/HomeClient';

export const metadata: Metadata = {
  title: 'FollowerScan - Descubra Quem Não Te Segue no Instagram',
  description:
    'Analise seus seguidores do Instagram de forma privada e segura. Descubra quem não te segue de volta, detecte bloqueios e obtenha insights valiosos. Processamento 100% local.',
  keywords: [
    'instagram',
    'seguidores',
    'quem não me segue',
    'unfollowers instagram',
    'detector de bloqueios',
    'análise instagram',
    'followerscan',
    'seguidores instagram',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com',
  },
  openGraph: {
    title: 'FollowerScan - Descubra Quem Não Te Segue no Instagram',
    description:
      'Análise de seguidores 100% privada. Descubra quem não te segue de volta, detecte bloqueios e obtenha insights valiosos.',
    url: 'https://www.followerscan.com',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Análise de Seguidores Instagram',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FollowerScan - Descubra Quem Não Te Segue no Instagram',
    description:
      'Análise de seguidores 100% privada. Descubra quem não te segue de volta.',
    images: ['/og-image.png'],
  },
};

export default function HomePage() {
  return <HomeClient />;
}