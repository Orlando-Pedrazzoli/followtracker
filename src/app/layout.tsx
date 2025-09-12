import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FollowTracker - Gerencie seus seguidores do Instagram',
  description:
    'Analise seus seguidores do Instagram de forma privada e segura. Descubra quem não está te seguindo de volta.',
  keywords: ['instagram', 'seguidores', 'followers', 'análise', 'privacidade'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
