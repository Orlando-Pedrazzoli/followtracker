import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RGPD - Proteção de Dados',
  description: 'Informações sobre conformidade com o RGPD (Regulamento Geral de Proteção de Dados) do FollowerScan. Seus direitos e como exercê-los.',
  alternates: {
    canonical: 'https://www.followerscan.com/gdpr',
  },
};

export default function GDPRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}