'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Trash2, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
  const router = useRouter();
  const lastUpdated = '16 de Dezembro de 2025';

  const sections = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: '1. Informações que Coletamos',
      content: `O FollowerScan foi desenvolvido com a privacidade como prioridade máxima. Coletamos apenas o mínimo necessário:

**Dados de Conta (quando você cria uma conta):**
• Email e nome (via Clerk Authentication)
• Informações de pagamento processadas diretamente pelo Stripe

**Dados do Instagram (quando você faz upload):**
• Os ficheiros JSON que você carrega são processados EXCLUSIVAMENTE no seu navegador
• Nenhum dado do Instagram é enviado para nossos servidores
• Nenhum dado é armazenado após você fechar a página

**Dados de Uso:**
• Informações anónimas sobre como você usa o serviço (páginas visitadas, funcionalidades usadas)
• Utilizamos estas informações apenas para melhorar o produto`,
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: '2. Processamento 100% Local',
      content: `Esta é a nossa principal diferença e compromisso com você:

**Como funciona:**
• Quando você faz upload dos seus dados do Instagram, todo o processamento acontece no seu próprio navegador
• Utilizamos JavaScript client-side para analisar os ficheiros
• Os dados nunca saem do seu dispositivo
• Não temos acesso às suas listas de seguidores, seguidos ou qualquer informação do seu Instagram

**Verificação:**
• Você pode verificar isso nas ferramentas de desenvolvedor do seu navegador
• Não há requisições de rede enviando seus dados do Instagram
• O código é transparente e pode ser auditado`,
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: '3. Segurança dos Dados',
      content: `Implementamos múltiplas camadas de segurança:

**Infraestrutura:**
• Conexões encriptadas via HTTPS/TLS
• Autenticação segura via Clerk (certificado SOC 2)
• Pagamentos processados pelo Stripe (certificado PCI DSS)

**Práticas de Segurança:**
• Não armazenamos dados sensíveis do Instagram
• Backups encriptados para dados de conta
• Monitorização contínua de vulnerabilidades
• Atualizações regulares de segurança`,
    },
    {
      icon: <Trash2 className="w-5 h-5" />,
      title: '4. Retenção e Eliminação',
      content: `Você tem controle total sobre seus dados:

**Dados do Instagram:**
• Eliminados automaticamente quando você fecha o navegador
• Nunca armazenados em nossos servidores

**Dados de Conta:**
• Mantidos enquanto sua conta estiver ativa
• Eliminados em até 30 dias após solicitar exclusão da conta

**Como solicitar eliminação:**
• Acesse as configurações da sua conta
• Ou envie email para: privacidade@followerscan.com
• Responderemos em até 48 horas úteis`,
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '5. Seus Direitos (RGPD)',
      content: `Se você está na União Europeia, tem os seguintes direitos:

• **Acesso:** Solicitar cópia dos seus dados pessoais
• **Retificação:** Corrigir dados incorretos
• **Eliminação:** Solicitar exclusão dos seus dados ("direito ao esquecimento")
• **Portabilidade:** Receber seus dados em formato estruturado
• **Oposição:** Opor-se ao processamento de dados
• **Limitação:** Restringir como usamos seus dados

Para exercer qualquer direito, contacte: privacidade@followerscan.com`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: '6. Contacto',
      content: `Para questões sobre privacidade:

**Email:** privacidade@followerscan.com
**Responsável:** Orlando Pedrazzoli
**Localização:** Lisboa, Portugal

Comprometemo-nos a responder todas as solicitações em até 30 dias, conforme exigido pelo RGPD.`,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 mb-6">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Privacidade Garantida</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Política de <span className="text-gradient">Privacidade</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Sua privacidade é nossa prioridade. Entenda como protegemos seus dados
            e porque o FollowerScan é a opção mais segura do mercado.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última atualização: {lastUpdated}
          </p>
        </motion.div>

        {/* Key Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-card p-6 md:p-8 border-green-500/30 bg-green-500/5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2">
                  🔒 Compromisso Zero-Knowledge
                </h2>
                <p className="text-slate-300">
                  <strong>Nunca vemos seus dados do Instagram.</strong> Todo o processamento
                  acontece localmente no seu navegador. Seus seguidores, seguidos e interações
                  nunca são enviados para nossos servidores. Esta é a nossa promessa fundamental.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Card className="glass-card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-4">
                      {section.title}
                    </h2>
                    <div className="text-slate-300 whitespace-pre-line leading-relaxed">
                      {section.content.split('**').map((part, i) =>
                        i % 2 === 1 ? (
                          <strong key={i} className="text-white">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-slate-400 mb-4">
            Tem dúvidas sobre nossa política de privacidade?
          </p>
          <Button
            onClick={() => window.location.href = 'mailto:privacidade@followerscan.com'}
            className="btn-secondary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contactar Equipa de Privacidade
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}