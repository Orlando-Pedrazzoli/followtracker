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

// Structured Data JSON-LD para SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'FollowerScan',
  description: 'Ferramenta de análise de seguidores do Instagram com processamento 100% local e privado. Descubra quem não te segue de volta, detecte bloqueios e obtenha insights valiosos.',
  url: 'https://www.followerscan.com',
  applicationCategory: 'SocialNetworkingApplication',
  operatingSystem: 'Web Browser',
  browserRequirements: 'Requires JavaScript',
  softwareVersion: '1.0',
  inLanguage: ['pt-BR', 'pt-PT'],
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '0',
    highPrice: '14.99',
    priceCurrency: 'EUR',
    offerCount: '3',
    offers: [
      {
        '@type': 'Offer',
        name: 'Plano Gratuito',
        price: '0',
        priceCurrency: 'EUR',
        description: '3 análises por mês, histórico de 7 dias',
      },
      {
        '@type': 'Offer',
        name: 'Plano Pro',
        price: '4.99',
        priceCurrency: 'EUR',
        description: 'Análises ilimitadas, detector de bloqueios, exportação PDF',
      },
      {
        '@type': 'Offer',
        name: 'Plano Business',
        price: '14.99',
        priceCurrency: 'EUR',
        description: 'Todos os recursos Pro + insights com IA, suporte prioritário',
      },
    ],
  },
  author: {
    '@type': 'Person',
    name: 'Orlando Pedrazzoli',
    url: 'https://orlandopedrazzoli.com',
  },
  publisher: {
    '@type': 'Organization',
    name: 'FollowerScan',
    url: 'https://www.followerscan.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.followerscan.com/logo.png',
      width: 512,
      height: 512,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1250',
    bestRating: '5',
    worstRating: '1',
  },
  featureList: [
    'Análise de seguidores do Instagram',
    'Detector de bloqueios',
    'Processamento 100% local',
    'Privacidade garantida',
    'Exportação em PDF',
    'Comparação temporal',
    'Insights avançados',
    'Suporte a múltiplas contas',
  ],
  screenshot: {
    '@type': 'ImageObject',
    url: 'https://www.followerscan.com/og-image.png',
    width: 1200,
    height: 630,
  },
};

// Structured Data para Organização
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FollowerScan',
  url: 'https://www.followerscan.com',
  logo: 'https://www.followerscan.com/logo.png',
  description: 'Ferramenta de análise de seguidores do Instagram com foco em privacidade.',
  founder: {
    '@type': 'Person',
    name: 'Orlando Pedrazzoli',
  },
  foundingDate: '2024',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'suporte@followerscan.com',
    availableLanguage: ['Portuguese', 'English'],
  },
  sameAs: [
    'https://twitter.com/followerscan',
  ],
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
          
          {/* Structured Data - WebApplication */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(jsonLd),
            }}
          />
          
          {/* Structured Data - Organization */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(organizationJsonLd),
            }}
          />
          
          {/* Theme Script */}
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