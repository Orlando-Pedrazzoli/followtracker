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
  Ban,
  Crown,
  Check,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';

export default function HomeClient() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen app-bg-animated">
      {/* Background Decorations */}
      <div className="bg-decorations" />
      <div className="bg-grid" />

      {/* Header com navegação */}
      <Header
        showNav={true}
        rightContent={
          <>
            {isLoaded && user ? (
              <>
                <Button
                  onClick={() => router.push('/dashboard/analyze')}
                  className="btn-secondary"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <Button variant="ghost" className="btn-ghost">
                    Entrar
                  </Button>
                </SignInButton>
                <Button
                  onClick={() => router.push('/auth/sign-up')}
                  className="btn-primary"
                >
                  Começar Grátis
                </Button>
              </>
            )}
          </>
        }
      />

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="badge-success inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">
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
              <span className="text-gradient">
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
                className="w-full sm:w-auto btn-primary px-8 py-6 text-lg"
              >
                Começar Análise Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => router.push('/pricing')}
                size="lg"
                className="w-full sm:w-auto btn-secondary px-8 py-6 text-lg"
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
              <span className="text-gradient">gerenciar seus seguidores</span>
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
              onClick={() => router.push('/sample')}
              delay={0.3}
              gradient="from-purple-500 to-pink-500"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="container mx-auto px-4 py-20">
          <Card className="glass-card p-8 md:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <StatItem number="10K+" label="Análises Realizadas" />
              <StatItem number="98%" label="Taxa de Satisfação" />
              <StatItem number="12+" label="Tipos de Arquivos" />
              <StatItem number="100%" label="Privacidade" />
            </div>
          </Card>
        </section>

        {/* Pricing CTA Section */}
        <section className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="badge-premium inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6">
              <Crown className="w-4 h-4" />
              <span className="text-sm font-medium">
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
                className="btn-primary px-8 py-6"
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
      <Card className="glass-card group p-6 hover:border-purple-500/50 transition-all duration-300 h-full">
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
      <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
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