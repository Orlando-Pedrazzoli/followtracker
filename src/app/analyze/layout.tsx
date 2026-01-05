import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análise de Seguidores',
  description: 'Visualize sua análise de seguidores do Instagram. Descubra quem não te segue de volta, bloqueios detectados e insights valiosos.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: 'https://www.followerscan.com/analyze',
  },
};

export default function AnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}