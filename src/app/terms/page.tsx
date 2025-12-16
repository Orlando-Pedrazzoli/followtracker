'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, XCircle, AlertTriangle, CreditCard, Scale, Mail, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
  const router = useRouter();
  const lastUpdated = '16 de Dezembro de 2025';

  const sections = [
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: '1. Aceitação dos Termos',
      content: `Ao aceder ou utilizar o FollowerScan ("Serviço"), você concorda com estes Termos de Uso. Se não concordar com alguma parte, não deve utilizar o Serviço.

**Ao usar o FollowerScan, você confirma que:**
• Tem pelo menos 18 anos de idade
• Tem capacidade legal para celebrar este acordo
• Utilizará o serviço apenas para fins legais
• Fornecerá informações verdadeiras e precisas

Reservamo-nos o direito de atualizar estes termos a qualquer momento. Alterações significativas serão comunicadas por email ou aviso no site.`,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: '2. Descrição do Serviço',
      content: `O FollowerScan é uma ferramenta de análise de dados do Instagram que permite:

**Funcionalidades Principais:**
• Analisar ficheiros de dados exportados do Instagram
• Identificar utilizadores que não seguem de volta
• Detectar possíveis bloqueios
• Gerar relatórios e estatísticas

**Como Funciona:**
• Você exporta seus dados diretamente do Instagram
• Faz upload dos ficheiros JSON no FollowerScan
• O processamento ocorre 100% no seu navegador
• Nenhum dado é enviado para nossos servidores

**Limitações:**
• Dependemos dos dados que o Instagram disponibiliza para exportação
• A precisão depende da qualidade dos dados exportados
• Não garantimos resultados específicos`,
    },
    {
      icon: <XCircle className="w-5 h-5" />,
      title: '3. Uso Proibido',
      content: `Ao utilizar o FollowerScan, você concorda em NÃO:

**Atividades Proibidas:**
• Utilizar o serviço para assédio, perseguição ou bullying
• Tentar aceder a contas ou dados de terceiros sem autorização
• Violar os Termos de Serviço do Instagram
• Utilizar bots, scrapers ou automações não autorizadas
• Revender ou redistribuir o serviço sem autorização
• Tentar fazer engenharia reversa do software
• Sobrecarregar nossos servidores intencionalmente

**Consequências:**
Violações podem resultar em suspensão ou cancelamento da conta, sem direito a reembolso.`,
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: '4. Pagamentos e Subscrições',
      content: `**Planos Disponíveis:**
• Gratuito: Funcionalidades básicas com limites
• Pro: Funcionalidades avançadas por €4.99/mês
• Business: Todas as funcionalidades por €14.99/mês

**Faturação:**
• Pagamentos processados de forma segura pelo Stripe
• Cobrança automática na data de renovação
• Preços podem ser alterados com aviso prévio de 30 dias

**Cancelamento:**
• Pode cancelar a qualquer momento nas configurações
• Acesso mantido até o fim do período pago
• Não há reembolsos proporcionais por períodos não utilizados

**Reembolsos:**
• Disponíveis apenas nos primeiros 7 dias após a primeira compra
• Solicite via email: suporte@followerscan.com`,
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: '5. Limitação de Responsabilidade',
      content: `**O Serviço é Fornecido "Como Está":**
O FollowerScan é fornecido sem garantias expressas ou implícitas. Não garantimos que:
• O serviço estará sempre disponível ou livre de erros
• Os resultados serão 100% precisos
• O serviço atenderá todas as suas expectativas

**Limitação de Danos:**
Em nenhuma circunstância seremos responsáveis por:
• Danos indiretos, incidentais ou consequenciais
• Perda de dados, lucros ou oportunidades de negócio
• Danos decorrentes do uso ou impossibilidade de uso do serviço

**Limite Máximo:**
Nossa responsabilidade total está limitada ao valor pago por você nos últimos 12 meses.`,
    },
    {
      icon: <Scale className="w-5 h-5" />,
      title: '6. Lei Aplicável e Jurisdição',
      content: `**Lei Aplicável:**
Estes termos são regidos pelas leis de Portugal e da União Europeia.

**Jurisdição:**
Qualquer disputa será resolvida nos tribunais de Lisboa, Portugal.

**Resolução de Disputas:**
• Tentaremos resolver disputas amigavelmente primeiro
• Mediação disponível através de entidades certificadas
• Arbitragem como alternativa aos tribunais, se acordado

**Direitos do Consumidor:**
Se você é consumidor na UE, estes termos não afetam seus direitos legais garantidos pela legislação de proteção ao consumidor.`,
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: '7. Contacto',
      content: `Para questões sobre estes Termos de Uso:

**Email:** legal@followerscan.com
**Suporte:** suporte@followerscan.com
**Responsável:** Orlando Pedrazzoli
**Morada:** Lisboa, Portugal

Comprometemo-nos a responder em até 5 dias úteis.`,
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
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Documento Legal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Termos de <span className="text-gradient">Uso</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Leia atentamente os termos que regem a utilização do FollowerScan.
            Ao usar nosso serviço, você concorda com estas condições.
          </p>
          <p className="text-slate-500 text-sm mt-4">
            Última atualização: {lastUpdated}
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <Card className="glass-card p-6 md:p-8 border-blue-500/30 bg-blue-500/5">
            <h2 className="text-xl font-bold text-white mb-4">📋 Resumo Rápido</h2>
            <div className="grid md:grid-cols-2 gap-4 text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Use para analisar seus próprios dados do Instagram</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Seus dados são processados localmente no navegador</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Cancele sua subscrição a qualquer momento</span>
              </div>
              <div className="flex items-start gap-2">
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <span>Não use para assédio ou atividades ilegais</span>
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
            Tem dúvidas sobre os termos de uso?
          </p>
          <Button
            onClick={() => window.location.href = 'mailto:legal@followerscan.com'}
            className="btn-secondary"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contactar Equipa Legal
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}