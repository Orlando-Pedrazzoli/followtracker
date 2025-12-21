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
  metadataBase: new URL('https://www.followerscan.com'),
  title: {
    default: 'FollowerScan - Analise seus Seguidores do Instagram',
    template: '%s | FollowerScan',
  },
  description:
    'Descubra quem não te segue de volta no Instagram. Análise 100% privada e segura, processamento local, detector de bloqueios e insights valiosos.',
  keywords: [
    'instagram',
    'seguidores',
    'followers',
    'análise instagram',
    'quem não me segue',
    'unfollowers',
    'detector de bloqueios',
    'instagram analytics',
    'seguidores instagram',
    'privacidade instagram',
  ],
  authors: [{ name: 'Orlando Pedrazzoli', url: 'https://orlandopedrazzoli.com' }],
  creator: 'Orlando Pedrazzoli',
  publisher: 'FollowerScan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.followerscan.com',
    languages: {
      'pt-BR': 'https://www.followerscan.com',
      'pt-PT': 'https://www.followerscan.com',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://www.followerscan.com',
    siteName: 'FollowerScan',
    title: 'FollowerScan - Descubra Quem Não Te Segue no Instagram',
    description: 'Análise de seguidores 100% privada. Descubra quem não te segue de volta, detecte bloqueios e obtenha insights valiosos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FollowerScan - Análise de Seguidores Instagram',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FollowerScan - Análise de Seguidores Instagram',
    description: 'Descubra quem não te segue de volta. 100% privado e seguro.',
    images: ['/og-image.png'],
    creator: '@followerscan',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon-insta.svg',
    shortcut: '/favicon-insta.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
  category: 'technology',
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
      <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon-insta.svg" type="image/svg+xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <meta name="theme-color" content="#0F0F23" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    var theme = localStorage.getItem('followerscan-theme') || 'dark';
                    document.documentElement.classList.remove('light', 'dark');
                    document.documentElement.classList.add(theme);
                  } catch (e) {}
                })();
              `,
            }}
          />
        </head>
        <body className={`${inter.className} antialiased`}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}