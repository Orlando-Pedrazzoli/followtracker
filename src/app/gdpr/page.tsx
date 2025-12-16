'use client';

import { motion } from 'framer-motion';
import { Shield, Database, UserCheck, FileKey, Globe, Clock, Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function GDPRPage() {
  const router = useRouter();
  const lastUpdated = '16 de Dezembro de 2025';

  const rights = [
    {
      title: 'Direito de Acesso',
      description: 'Pode solicitar uma cópia de todos os dados pessoais que temos sobre você.',
      icon: <Database className="w-5 h-5" />,
    },
    {
      title: 'Direito de Retificação',
      description: 'Pode corrigir dados pessoais incorretos ou incompletos.',
      icon: <UserCheck className="w-5 h-5" />,
    },
    {
      title: 'Direito ao Esquecimento',
      description: 'Pode solicitar a eliminação de todos os seus dados pessoais.',
      icon: <FileKey className="w-5 h-5" />,
    },
    {
      title: 'Direito à Portabilidade',
      description: 'Pode receber seus dados em formato estruturado e transferível.',
      icon: <Globe className="w-5 h-5" />,
    },
    {
      title: 'Direito de Oposição',
      description: 'Pode opor-se ao processamento dos seus dados para certos fins.',
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: 'Direito à Limitação',
      description: 'Pode restringir a forma como processamos seus dados.',
      icon: <Clock className="w-5 h-5" />,
    },
  ];

  const dataProcessing = [
    {
      category: 'Dados de Conta',
      data: 'Email, nome, ID de utilizador',
      purpose: 'Autenticação e gestão de conta',
      legal: 'Execução de contrato',
      retention: 'Enquanto a conta estiver ativa',
    },
    {
      category: 'Dados de Pagamento',
      data: 'Processados diretamente pelo Stripe',
      purpose: 'Processar pagamentos',
      legal: 'Execução de contrato',
      retention: 'Conforme requisitos fiscais (7 anos)',
    },
    {
      category: 'Dados do Instagram',
      data: 'Ficheiros JSON carregados',
      purpose: 'Análise de seguidores',
      legal: 'Consentimento',
      retention: 'Nunca armazenados (processamento local)',
    },
    {
      category: 'Dados de Uso',
      data: 'Páginas visitadas, funcionalidades usadas',
      purpose: 'Melhorar o serviço',
      legal: 'Interesse legítimo',
      retention: 'Dados anonimizados após 90 dias',
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 mb-6">
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">União Europeia</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Conformidade <span className="text-gradient">RGPD</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            O FollowerScan está em total conformidade com o Regulamento Geral de
            Proteção de Dados (RGPD) da União Europeia.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última atualização: {lastUpdated}
          </p>
        </motion.div>

        {/* Compliance Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-card p-6 md:p-8 border-green-500/30 bg-green-500/5">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-10 h-10 text-green-400" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold text-white mb-2">
                  ✅ Totalmente Conforme com RGPD
                </h2>
                <p className="text-slate-300">
                  Implementamos todas as medidas técnicas e organizacionais necessárias
                  para garantir a proteção dos seus dados pessoais conforme exigido pelo
                  Regulamento (UE) 2016/679.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Your Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🛡️ Os Seus Direitos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rights.map((right, index) => (
              <Card key={index} className="glass-card p-5">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                    {right.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">{right.title}</h3>
                    <p className="text-slate-400 text-sm">{right.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Data Processing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            📊 Como Processamos os Seus Dados
          </h2>
          <Card className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-slate-300 font-semibold">Categoria</th>
                    <th className="text-left p-4 text-slate-300 font-semibold">Dados</th>
                    <th className="text-left p-4 text-slate-300 font-semibold">Finalidade</th>
                    <th className="text-left p-4 text-slate-300 font-semibold">Base Legal</th>
                    <th className="text-left p-4 text-slate-300 font-semibold">Retenção</th>
                  </tr>
                </thead>
                <tbody>
                  {dataProcessing.map((item, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-white font-medium">{item.category}</td>
                      <td className="p-4 text-slate-400">{item.data}</td>
                      <td className="p-4 text-slate-400">{item.purpose}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                          {item.legal}
                        </span>
                      </td>
                      <td className="p-4 text-slate-400">{item.retention}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            🔑 Pontos-Chave da Nossa Conformidade
          </h2>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {[
              'Processamento local dos dados do Instagram - nunca saem do seu navegador',
              'Encriptação de dados em trânsito e em repouso',
              'Direito de eliminação garantido em até 30 dias',
              'Não vendemos ou partilhamos dados pessoais com terceiros',
              'Subprocessadores em conformidade (Clerk, Stripe, Vercel)',
              'Notificação de violação de dados em até 72 horas',
              'Encarregado de Proteção de Dados designado',
              'Avaliações de impacto realizadas regularmente',
            ].map((point, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{point}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Exercise Rights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <Card className="glass-card p-6 md:p-8 max-w-2xl mx-auto text-center">
            <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">
              Exercer os Seus Direitos
            </h2>
            <p className="text-slate-400 mb-6">
              Para exercer qualquer um dos seus direitos RGPD, envie um email para:
            </p>
            <a
              href="mailto:rgpd@followerscan.com"
              className="text-2xl font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              rgpd@followerscan.com
            </a>
            <p className="text-slate-500 text-sm mt-4">
              Responderemos em até 30 dias, conforme exigido pelo RGPD.
            </p>
          </Card>
        </motion.div>

        {/* DPO Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Card className="glass-card p-6 inline-block">
            <h3 className="text-white font-semibold mb-2">
              Encarregado de Proteção de Dados (DPO)
            </h3>
            <p className="text-slate-400">
              Orlando Pedrazzoli<br />
              Email: dpo@followerscan.com<br />
              Lisboa, Portugal
            </p>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}