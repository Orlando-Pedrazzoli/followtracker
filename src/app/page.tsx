'use client';

import { useRouter } from 'next/navigation';
import { useUser, SignInButton, UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  Users,
  ArrowRight,
  BookOpen,
  Upload,
  BarChart3,
  Shield,
  Zap,
  TrendingUp,
  Ban,
  Crown,
  Check,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Users className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">FollowerScan</h1>
                <p className="text-slate-400 text-xs">Análise de Seguidores Instagram</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => router.push('/pricing')}
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Preços
              </button>
              <button
                onClick={() => router.push('/tutorial')}
                className="text-slate-300 hover:text-white transition-colors text-sm"
              >
                Tutorial
              </button>
            </nav>

            <div className="flex items-center gap-3">
              {isLoaded && user ? (
                <>
                  <Button
                    onClick={() => router.push('/dashboard/analyze')}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <SignInButton mode="modal">
                    <Button variant="ghost" className="text-slate-300 hover:text-white">
                      Entrar
                    </Button>
                  </SignInButton>
                  <Button
                    onClick={() => router.push('/auth/sign-up')}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    Começar Grátis
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-8"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-purple-200 text-sm font-medium">
                +10.000 análises realizadas
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              Descubra quem
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                não te segue de volta
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
            >
              Analise seus seguidores do Instagram de forma privada e segura.
              Detecte bloqueios, acompanhe mudanças e obtenha insights valiosos.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                onClick={() => router.push('/tutorial')}
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-6 text-lg shadow-xl shadow-purple-500/25"
              >
                Começar Análise Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => router.push('/pricing')}
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Ver Planos
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 text-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Privado</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>Processamento Local</span>
              </div>
              <div className="flex items-center gap-2">
                <Ban className="w-4 h-4 text-red-400" />
                <span>Detector de Bloqueios</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Tudo que você precisa para
              <br />
              <span className="text-purple-400">gerenciar seus seguidores</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="Tutorial Passo a Passo"
              description="Guia completo para exportar seus dados do Instagram de forma simples e segura"
              action="Ver Tutorial"
              onClick={() => router.push('/tutorial')}
              delay={0.1}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Upload className="w-6 h-6" />}
              title="Upload Seguro"
              description="Seus dados são processados localmente, sem envio para servidores externos"
              action="Fazer Upload"
              onClick={() => router.push('/upload')}
              delay={0.2}
              gradient="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Análise Completa"
              description="Estatísticas detalhadas, insights valiosos e recomendações personalizadas"
              action="Ver Exemplo"
              onClick={() => router.push('/analyze')}
              delay={0.3}
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatItem number="10K+" label="Análises Realizadas" />
              <StatItem number="98%" label="Taxa de Satisfação" />
              <StatItem number="12+" label="Tipos de Arquivos" />
              <StatItem number="100%" label="Privacidade" />
            </div>
          </div>
        </section>

        {/* Pricing CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-amber-200 text-sm font-medium">
                Desbloqueie recursos premium
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Pronto para o próximo nível?
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
              Faça upgrade para desbloquear análises ilimitadas, detector de bloqueios e muito mais.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => router.push('/pricing')}
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-8 py-6"
              >
                Ver Planos e Preços
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Quick Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <QuickBenefit text="Análises ilimitadas" />
              <QuickBenefit text="Detector de bloqueios" />
              <QuickBenefit text="Exportar PDF" />
              <QuickBenefit text="Suporte prioritário" />
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon,
  title,
  description,
  action,
  onClick,
  delay,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  delay: number;
  gradient: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      <Card className="group relative bg-white/5 border-white/10 backdrop-blur-xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-purple-500/50 h-full">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
        <p className="text-slate-400 text-sm mb-4">{description}</p>
        <Button
          variant="ghost"
          onClick={onClick}
          className="text-purple-400 hover:text-purple-300 p-0 h-auto font-medium"
        >
          {action}
          <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
      </Card>
    </motion.div>
  );
}

// Stat Item Component
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-slate-400">{label}</div>
    </motion.div>
  );
}

// Quick Benefit Component
function QuickBenefit({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-slate-300">
      <Check className="w-4 h-4 text-green-400" />
      <span className="text-sm">{text}</span>
    </div>
  );
}