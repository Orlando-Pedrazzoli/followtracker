import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Análise de Seguidores',
  description: 'Painel de análise detalhada dos seus seguidores do Instagram. Área privada do FollowerScan.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function DashboardAnalyzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}