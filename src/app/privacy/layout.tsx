import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de privacidade do FollowerScan. Saiba como protegemos seus dados e garantimos 100% de privacidade na análise de seguidores do Instagram.',
  alternates: {
    canonical: 'https://www.followerscan.com/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}