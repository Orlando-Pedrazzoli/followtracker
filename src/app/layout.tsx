import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FollowerScan - Gerencie seus seguidores do Instagram',
  description:
    'Analise seus seguidores do Instagram de forma privada e segura. Descubra quem não está te seguindo de volta.',
  keywords: [
    'instagram',
    'seguidores',
    'followers',
    'análise',
    'privacidade',
    'scan',
  ],
  icons: {
    icon: '/instagram-explore.svg',
    shortcut: '/instagram-explore.svg',
    apple: '/instagram-explore.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <head>
        <link rel='icon' href='/instagram-explore.svg' type='image/svg+xml' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
