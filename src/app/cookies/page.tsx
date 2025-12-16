'use client';

import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, BarChart, ArrowLeft, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function CookiesPage() {
  const router = useRouter();
  const lastUpdated = '16 de Dezembro de 2025';

  const cookieTypes = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Cookies Essenciais',
      required: true,
      description: 'Necessários para o funcionamento básico do site.',
      cookies: [
        {
          name: '__clerk_*',
          purpose: 'Autenticação e sessão do utilizador',
          duration: 'Sessão / 1 ano',
          provider: 'Clerk',
        },
        {
          name: '__stripe_*',
          purpose: 'Processamento seguro de pagamentos',
          duration: 'Sessão',
          provider: 'Stripe',
        },
      ],
    },
    {
      icon: <BarChart className="w-5 h-5" />,
      title: 'Cookies de Análise',
      required: false,
      description: 'Ajudam-nos a entender como os visitantes usam o site.',
      cookies: [
        {
          name: '_vercel_*',
          purpose: 'Análise de performance e erros',
          duration: '1 ano',
          provider: 'Vercel',
        },
      ],
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Cookies de Preferências',
      required: false,
      description: 'Guardam suas preferências para melhorar a experiência.',
      cookies: [
        {
          name: 'theme',
          purpose: 'Preferência de tema (claro/escuro)',
          duration: '1 ano',
          provider: 'FollowerScan',
        },
        {
          name: 'locale',
          purpose: 'Preferência de idioma',
          duration: '1 ano',
          provider: 'FollowerScan',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen app-bg-animated">
      <div className="bg-decorations" />
      <div className="bg-grid" />

      <Header showNav={true} />

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 mb-6">
            <Cookie className="w-4 h-4" />
            <span className="text-sm font-medium">Política de Cookies</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de <span className="text-gradient">Cookies</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Entenda como utilizamos cookies para melhorar sua experiência no FollowerScan.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última atualização: {lastUpdated}
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 max-w-4xl mx-auto"
        >
          <Card className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">O que são Cookies?</h2>
            <p className="text-slate-300 mb-4">
              Cookies são pequenos ficheiros de texto que são armazenados no seu dispositivo
              quando você visita um website. Eles são amplamente utilizados para fazer os
              websites funcionarem de forma mais eficiente, bem como para fornecer informações
              aos proprietários do site.
            </p>
            <p className="text-slate-300">
              O FollowerScan utiliza um número mínimo de cookies, priorizando sempre sua
              privacidade. <strong className="text-white">Importante:</strong> Os dados do
              Instagram que você carrega para análise NÃO são armazenados em cookies nem
              enviados para nossos servidores.
            </p>
          </Card>
        </motion.div>

        {/* Cookie Types */}
        <div className="space-y-6 max-w-4xl mx-auto mb-12">
          {cookieTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className="glass-card p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{type.title}</h3>
                      <p className="text-slate-400 text-sm">{type.description}</p>
                    </div>
                  </div>
                  {type.required ? (
                    <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      Obrigatório
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-slate-500/20 text-slate-400 text-xs font-medium">
                      Opcional
                    </span>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 text-slate-400 font-medium">Cookie</th>
                        <th className="text-left py-2 text-slate-400 font-medium">Finalidade</th>
                        <th className="text-left py-2 text-slate-400 font-medium">Duração</th>
                        <th className="text-left py-2 text-slate-400 font-medium">Provedor</th>
                      </tr>
                    </thead>
                    <tbody>
                      {type.cookies.map((cookie, cookieIndex) => (
                        <tr key={cookieIndex} className="border-b border-white/5">
                          <td className="py-2 text-white font-mono text-xs">{cookie.name}</td>
                          <td className="py-2 text-slate-300">{cookie.purpose}</td>
                          <td className="py-2 text-slate-400">{cookie.duration}</td>
                          <td className="py-2 text-slate-400">{cookie.provider}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <Card className="glass-card p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-4">
              🔧 Como Gerir os Cookies
            </h2>
            <p className="text-slate-300 mb-4">
              Você pode controlar e/ou eliminar cookies conforme desejar. Pode eliminar
              todos os cookies que já estão no seu computador e pode configurar a maioria
              dos navegadores para impedir que sejam colocados.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { browser: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                { browser: 'Firefox', url: 'https://support.mozilla.org/pt-BR/kb/cookies' },
                { browser: 'Safari', url: 'https://support.apple.com/pt-br/guide/safari/sfri11471' },
                { browser: 'Edge', url: 'https://support.microsoft.com/pt-br/microsoft-edge/cookies' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <span className="text-slate-300">{item.browser}</span>
                  <span className="text-purple-400 text-sm">Ver instruções →</span>
                </a>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-slate-400 mb-4">
            Tem dúvidas sobre nossa política de cookies?
          </p>
          <Button
            onClick={() => window.location.href = 'mailto:privacidade@followerscan.com'}
            className="btn-secondary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contactar-nos
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}