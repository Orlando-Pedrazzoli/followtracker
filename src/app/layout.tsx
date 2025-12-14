import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ptBR } from '@clerk/localizations';
import { Providers } from './providers';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://followerscan.com'),
  title: 'FollowerScan - Gerencie seus seguidores do Instagram',
  description:
    'Analise seus seguidores do Instagram de forma privada e segura. Descubra quem não está te seguindo de volta, detecte bloqueios e obtenha insights valiosos.',
  keywords: [
    'instagram',
    'seguidores',
    'followers',
    'análise',
    'privacidade',
    'scan',
    'bloqueios',
    'unfollowers',
  ],
  authors: [{ name: 'Orlando Pedrazzoli' }],
  creator: 'Orlando Pedrazzoli',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://followerscan.com',
    siteName: 'FollowerScan',
    title: 'FollowerScan - Analise seus seguidores do Instagram',
    description: 'Descubra quem não te segue de volta, detecte bloqueios e obtenha insights valiosos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FollowerScan',
    description: 'Analise seus seguidores do Instagram de forma privada',
  },
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
    <ClerkProvider
      localization={ptBR}
      appearance={{
        variables: {
          colorPrimary: '#8B5CF6',
          colorBackground: '#0F0F23',
          colorText: '#FFFFFF',
          colorTextSecondary: '#94A3B8',
          colorInputBackground: '#1E1E3F',
          colorInputText: '#FFFFFF',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary:
            'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
          card: 'bg-slate-900/90 backdrop-blur-xl border border-white/10',
          headerTitle: 'text-white',
          headerSubtitle: 'text-slate-400',
          socialButtonsBlockButton:
            'bg-white/10 border-white/20 text-white hover:bg-white/20',
          formFieldLabel: 'text-slate-300',
          formFieldInput:
            'bg-white/5 border-white/10 text-white placeholder:text-slate-500',
          footerActionLink: 'text-purple-400 hover:text-purple-300',
          identityPreviewText: 'text-white',
          identityPreviewEditButton: 'text-purple-400',
          userButtonPopoverCard: 'bg-slate-900 border border-white/10',
          userButtonPopoverActionButton: 'text-slate-300 hover:bg-white/10',
          userButtonPopoverActionButtonText: 'text-slate-300',
          userButtonPopoverFooter: 'hidden',
        },
      }}
    >
      <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <head>
          <link rel="icon" href="/instagram-explore.svg" type="image/svg+xml" />
        </head>
        <body className={`${inter.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}