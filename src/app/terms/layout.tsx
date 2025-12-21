import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termos de Uso',
  description: 'Termos de uso do FollowerScan. Leia os termos e condições para utilização da nossa ferramenta de análise de seguidores do Instagram.',
  alternates: {
    canonical: 'https://www.followerscan.com/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}