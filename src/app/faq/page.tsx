'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search, Shield, Upload, CreditCard, Settings, ArrowLeft, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  icon: React.ReactNode;
  title: string;
  items: FAQItem[];
}

export default function FAQPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const categories: FAQCategory[] = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: 'Geral',
      items: [
        {
          question: 'O que é o FollowerScan?',
          answer: 'O FollowerScan é uma ferramenta que analisa os dados exportados do seu Instagram para mostrar quem não te segue de volta, detectar possíveis bloqueios e fornecer insights sobre seus seguidores. Todo o processamento acontece localmente no seu navegador, garantindo 100% de privacidade.',
        },
        {
          question: 'O FollowerScan é seguro?',
          answer: 'Sim, absolutamente! O FollowerScan foi desenvolvido com segurança e privacidade como prioridades. Seus dados do Instagram nunca são enviados para nossos servidores - todo o processamento acontece no seu próprio navegador. Não temos acesso às suas credenciais do Instagram nem aos seus dados de seguidores.',
        },
        {
          question: 'Como o FollowerScan é diferente de outras ferramentas?',
          answer: 'A principal diferença é nossa abordagem de privacidade. Enquanto outras ferramentas pedem acesso à sua conta Instagram ou enviam seus dados para servidores externos, o FollowerScan processa tudo localmente no seu navegador. Você exporta seus dados diretamente do Instagram e nós analisamos sem nunca ter acesso a eles.',
        },
        {
          question: 'Preciso dar acesso à minha conta do Instagram?',
          answer: 'Não! Você nunca precisa fornecer sua senha ou dar acesso à sua conta. Você exporta os dados diretamente do Instagram através das configurações oficiais da plataforma, e depois faz upload dos ficheiros JSON no FollowerScan.',
        },
      ],
    },
    {
      icon: <Upload className="w-5 h-5" />,
      title: 'Upload e Análise',
      items: [
        {
          question: 'Como exporto meus dados do Instagram?',
          answer: 'Vá às Configurações do Instagram > Sua atividade > Baixar suas informações. Selecione o formato JSON e solicite o download. O Instagram enviará um email com o link para baixar seus dados em até 48 horas. Temos um tutorial detalhado na página de Tutorial.',
        },
        {
          question: 'Quais arquivos preciso fazer upload?',
          answer: 'Os arquivos essenciais são "followers_1.json" (seus seguidores) e "following.json" (quem você segue). Opcionalmente, pode incluir outros como "blocked_profiles.json", "close_friends.json", etc., para uma análise mais completa.',
        },
        {
          question: 'Posso fazer upload do arquivo ZIP completo?',
          answer: 'Sim! Você pode arrastar o arquivo ZIP completo que o Instagram envia, e nosso sistema extrairá automaticamente os ficheiros necessários. Não precisa descompactar manualmente.',
        },
        {
          question: 'Quanto tempo demora a análise?',
          answer: 'A análise é quase instantânea! Como todo o processamento acontece no seu navegador, geralmente leva apenas alguns segundos, independentemente de quantos seguidores você tem.',
        },
        {
          question: 'Meus dados ficam armazenados após a análise?',
          answer: 'Não. Seus dados existem apenas temporariamente na memória do seu navegador durante a análise. Quando você fecha a página ou o navegador, todos os dados são automaticamente eliminados. Não armazenamos nada em nossos servidores.',
        },
      ],
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Privacidade e Segurança',
      items: [
        {
          question: 'Vocês têm acesso aos meus dados do Instagram?',
          answer: 'Não. Os ficheiros que você carrega são processados exclusivamente no seu navegador usando JavaScript client-side. Nenhum dado é enviado para nossos servidores. Você pode verificar isso nas ferramentas de desenvolvedor do navegador - não há requisições de rede enviando seus dados.',
        },
        {
          question: 'O Instagram pode saber que uso o FollowerScan?',
          answer: 'Não. O FollowerScan analisa dados que você já exportou do Instagram. Não fazemos nenhuma conexão com a API do Instagram nem acessamos sua conta de forma alguma.',
        },
        {
          question: 'Posso ser banido do Instagram por usar o FollowerScan?',
          answer: 'Não. O FollowerScan não viola os termos de serviço do Instagram porque não acessa sua conta nem usa automações. Você simplesmente analisa dados que o próprio Instagram disponibilizou para você.',
        },
        {
          question: 'Como protegem os dados de pagamento?',
          answer: 'Não processamos nem armazenamos dados de pagamento. Todos os pagamentos são processados diretamente pelo Stripe, um dos processadores de pagamento mais seguros do mundo, certificado PCI DSS Nível 1.',
        },
      ],
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: 'Planos e Pagamentos',
      items: [
        {
          question: 'O FollowerScan tem versão gratuita?',
          answer: 'Sim! O plano gratuito permite 3 análises por mês, histórico de 7 dias e análise de 1 conta Instagram. É perfeito para uso pessoal ocasional.',
        },
        {
          question: 'Quais são os benefícios do plano Pro?',
          answer: 'O plano Pro (€4.99/mês) inclui análises ilimitadas, histórico de 90 dias, suporte para 3 contas Instagram, detector de bloqueios avançado, exportação em PDF e comparação temporal para ver mudanças ao longo do tempo.',
        },
        {
          question: 'Posso cancelar a qualquer momento?',
          answer: 'Sim! Você pode cancelar sua subscrição a qualquer momento nas configurações da conta. Continuará tendo acesso até o fim do período já pago.',
        },
        {
          question: 'Vocês oferecem reembolso?',
          answer: 'Oferecemos reembolso total nos primeiros 7 dias após a primeira compra. Após esse período, não há reembolsos proporcionais, mas você pode cancelar para não ser cobrado novamente.',
        },
        {
          question: 'Quais métodos de pagamento são aceitos?',
          answer: 'Aceitamos Visa, Mastercard, American Express, PayPal, Apple Pay e Google Pay. Todos os pagamentos são processados de forma segura pelo Stripe.',
        },
      ],
    },
    {
      icon: <Settings className="w-5 h-5" />,
      title: 'Funcionalidades',
      items: [
        {
          question: 'O que é o Detector de Bloqueios?',
          answer: 'O Detector de Bloqueios analisa padrões nos seus dados para identificar contas que possivelmente te bloquearam. Funciona comparando suas listas de seguidores e seguidos com interações anteriores.',
        },
        {
          question: 'Posso exportar os resultados?',
          answer: 'Sim! Nos planos pagos, você pode exportar os resultados em formato PDF para guardar ou compartilhar. O plano Business também permite exportação em CSV.',
        },
        {
          question: 'O que é a Comparação Temporal?',
          answer: 'A Comparação Temporal permite comparar análises feitas em diferentes momentos para ver quem começou ou deixou de te seguir ao longo do tempo. Disponível nos planos Pro e Business.',
        },
        {
          question: 'Posso analisar múltiplas contas?',
          answer: 'Sim! O plano Pro permite até 3 contas e o Business até 10 contas. No plano gratuito, apenas 1 conta.',
        },
      ],
    },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.items.length > 0);

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      }))
    ),
  };

  return (
    <div className="min-h-screen app-bg-animated">
      <div className="bg-decorations" />
      <div className="bg-grid" />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Central de Ajuda</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Encontre respostas para as dúvidas mais comuns sobre o FollowerScan.
            Não encontrou o que procura? Entre em contacto connosco.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Pesquisar perguntas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="max-w-3xl mx-auto space-y-8">
          {filteredCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                  {category.icon}
                </div>
                <h2 className="text-xl font-semibold text-white">{category.title}</h2>
              </div>

              <Card className="glass-card overflow-hidden">
                {category.items.map((item, itemIndex) => {
                  const itemId = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems.includes(itemId);

                  return (
                    <div
                      key={itemIndex}
                      className={`border-b border-white/10 last:border-b-0 ${
                        isOpen ? 'bg-white/5' : ''
                      }`}
                    >
                      <button
                        onClick={() => toggleItem(itemId)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                      >
                        <span className="text-white font-medium pr-4">
                          {item.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-slate-300 leading-relaxed">
                              {item.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum resultado encontrado
            </h3>
            <p className="text-slate-400">
              Tente pesquisar com outras palavras ou entre em contacto connosco.
            </p>
          </motion.div>
        )}

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="glass-card p-8 text-center max-w-2xl mx-auto">
            <MessageCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Ainda tem dúvidas?
            </h2>
            <p className="text-slate-400 mb-6">
              Nossa equipa está pronta para ajudar. Entre em contacto e
              responderemos o mais rápido possível.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = 'mailto:suporte@followerscan.com'}
                className="btn-primary"
              >
                Enviar Email
              </Button>
              <Button
                onClick={() => router.push('/tutorial')}
                className="btn-secondary"
              >
                Ver Tutorial
              </Button>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}