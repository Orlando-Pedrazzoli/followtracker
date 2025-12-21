import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorial - Como Exportar Dados do Instagram',
  description: 'Aprenda passo a passo como exportar seus dados de seguidores do Instagram. Tutorial completo e seguro para usar o FollowerScan em 5 minutos.',
  keywords: [
    'como exportar dados instagram',
    'baixar dados instagram',
    'exportar seguidores instagram',
    'download dados instagram',
    'tutorial instagram dados',
    'como ver quem não me segue',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com/tutorial',
  },
  openGraph: {
    title: 'Tutorial: Como Exportar Dados do Instagram | FollowerScan',
    description: 'Guia passo a passo para exportar seus dados de seguidores do Instagram de forma segura.',
    url: 'https://www.followerscan.com/tutorial',
    images: [
      {
        url: '/og-tutorial.png',
        width: 1200,
        height: 630,
        alt: 'Tutorial FollowerScan - Exportar Dados Instagram',
      },
    ],
  },
  twitter: {
    title: 'Tutorial: Exportar Dados do Instagram | FollowerScan',
    description: 'Aprenda a exportar seus dados do Instagram em 5 passos simples.',
  },
};

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}