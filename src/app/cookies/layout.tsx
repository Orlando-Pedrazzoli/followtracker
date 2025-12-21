import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Cookies',
  description: 'Política de cookies do FollowerScan. Saiba quais cookies utilizamos e como gerir as suas preferências.',
  alternates: {
    canonical: 'https://www.followerscan.com/cookies',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}