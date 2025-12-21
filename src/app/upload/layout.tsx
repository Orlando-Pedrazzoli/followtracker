import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload de Dados',
  description: 'Faça upload dos seus arquivos JSON do Instagram para análise. Processamento 100% local e seguro, seus dados nunca saem do seu navegador.',
  keywords: [
    'upload dados instagram',
    'analisar seguidores',
    'followerscan upload',
    'importar dados instagram',
  ],
  alternates: {
    canonical: 'https://www.followerscan.com/upload',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}