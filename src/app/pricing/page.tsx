'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, SignInButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Sparkles,
  Zap,
  Shield,
  Crown,
  ArrowRight,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Footer } from '@/components/ui/footer';
import {
  PRICING_TIERS,
  FEATURE_DESCRIPTIONS,
  PricingTier,
  TierLimits,
} from '@/lib/subscription';
import { useSubscription } from '@/hooks/useSubscription';

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const { user, isLoaded } = useUser();
  const { tier: currentTier } = useSubscription();
  const router = useRouter();

  const handleSelectPlan = async (tier: PricingTier) => {
    if (!user) {
      router.push('/auth/sign-in?redirect_url=/pricing');
      return;
    }

    if (tier.id === 'free') {
      router.push('/dashboard/analyze');
      return;
    }

    try {
      const response = await fetch('/api/subscription/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: tier.stripePriceId[billingPeriod],
          tierId: tier.id,
        }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Erro ao criar checkout:', error);
    }
  };

  const yearlyDiscount = Math.round(
    ((PRICING_TIERS[1].price.monthly * 12 - PRICING_TIERS[1].price.yearly) /
      (PRICING_TIERS[1].price.monthly * 12)) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Users className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">FollowerScan</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <Button
                  onClick={() => router.push('/dashboard/analyze')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
                >
                  Dashboard
                </Button>
              ) : (
                <SignInButton mode="modal">
                  <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/20">
                    Entrar
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-200 text-sm font-medium">
              Economize {yearlyDiscount}% no plano anual
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Escolha o plano ideal
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              para você
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Desbloqueie todo o potencial do FollowerScan e descubra insights valiosos sobre seus seguidores do Instagram.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/5 rounded-full p-1.5 border border-white/10">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                billingPeriod === 'monthly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                billingPeriod === 'yearly'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Anual
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                -{yearlyDiscount}%
              </span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {PRICING_TIERS.map((tier, index) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              billingPeriod={billingPeriod}
              isCurrentPlan={currentTier === tier.id}
              onSelect={() => handleSelectPlan(tier)}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Features Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
            Compare todos os recursos
          </h2>
          
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/10 bg-white/5">
              <div className="text-slate-400 font-medium">Recurso</div>
              {PRICING_TIERS.map(tier => (
                <div key={tier.id} className="text-center">
                  <span className="text-white font-semibold">{tier.name}</span>
                </div>
              ))}
            </div>
            
            {/* Analyses */}
            <FeatureRow
              name="Análises por mês"
              values={PRICING_TIERS.map(t =>
                t.limits.analysesPerMonth === -1 ? 'Ilimitado' : t.limits.analysesPerMonth.toString()
              )}
            />
            
            {/* History */}
            <FeatureRow
              name="Histórico de análises"
              values={PRICING_TIERS.map(t =>
                t.limits.historyDays === -1 ? 'Ilimitado' : `${t.limits.historyDays} dias`
              )}
            />
            
            {/* Accounts */}
            <FeatureRow
              name="Contas Instagram"
              values={PRICING_TIERS.map(t => t.limits.maxAccounts.toString())}
            />
            
            {/* Features */}
            {(Object.keys(FEATURE_DESCRIPTIONS) as Array<keyof TierLimits['features']>).map(
              feature => (
                <FeatureRow
                  key={feature}
                  name={FEATURE_DESCRIPTIONS[feature].name}
                  values={PRICING_TIERS.map(t => t.limits.features[feature])}
                  isBoolean
                />
              )
            )}
          </div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="flex flex-wrap justify-center gap-8 text-slate-400">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span>Pagamento 100% seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>Ativação instantânea</span>
            </div>
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-purple-400" />
              <span>Cancele quando quiser</span>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}

// Pricing Card Component
function PricingCard({
  tier,
  billingPeriod,
  isCurrentPlan,
  onSelect,
  delay,
}: {
  tier: PricingTier;
  billingPeriod: 'monthly' | 'yearly';
  isCurrentPlan: boolean;
  onSelect: () => void;
  delay: number;
}) {
  const price = tier.price[billingPeriod];
  const monthlyEquivalent = billingPeriod === 'yearly' ? (price / 12).toFixed(2) : price;
  
  const getTierIcon = () => {
    switch (tier.id) {
      case 'free':
        return <Users className="w-6 h-6" />;
      case 'pro':
        return <Zap className="w-6 h-6" />;
      case 'business':
        return <Crown className="w-6 h-6" />;
    }
  };

  const getTierGradient = () => {
    switch (tier.id) {
      case 'free':
        return 'from-slate-500 to-slate-600';
      case 'pro':
        return 'from-purple-500 to-pink-500';
      case 'business':
        return 'from-amber-500 to-orange-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`relative rounded-2xl ${
        tier.popular
          ? 'bg-gradient-to-b from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50'
          : 'bg-white/5 border border-white/10'
      } backdrop-blur-xl p-6 flex flex-col`}
    >
      {/* Popular Badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg shadow-purple-500/25">
            {tier.badge}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTierGradient()} flex items-center justify-center text-white mb-4`}
        >
          {getTierIcon()}
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
        <p className="text-slate-400 text-sm">{tier.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">
            {price === 0 ? 'Grátis' : `€${monthlyEquivalent}`}
          </span>
          {price > 0 && <span className="text-slate-400">/mês</span>}
        </div>
        {billingPeriod === 'yearly' && price > 0 && (
          <p className="text-sm text-slate-500 mt-1">
            €{price} cobrado anualmente
          </p>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        <FeatureItem
          included
          text={
            tier.limits.analysesPerMonth === -1
              ? 'Análises ilimitadas'
              : `${tier.limits.analysesPerMonth} análises/mês`
          }
        />
        <FeatureItem
          included
          text={
            tier.limits.historyDays === -1
              ? 'Histórico ilimitado'
              : `Histórico de ${tier.limits.historyDays} dias`
          }
        />
        <FeatureItem
          included
          text={`${tier.limits.maxAccounts} ${tier.limits.maxAccounts === 1 ? 'conta' : 'contas'} Instagram`}
        />
        <FeatureItem
          included={tier.limits.features.blockDetector}
          text="Detector de bloqueios"
        />
        <FeatureItem
          included={tier.limits.features.exportPdf}
          text="Exportar PDF"
        />
        <FeatureItem
          included={tier.limits.features.temporalComparison}
          text="Comparação temporal"
        />
        <FeatureItem
          included={tier.limits.features.advancedInsights}
          text="Insights avançados"
        />
        {tier.id === 'business' && (
          <>
            <FeatureItem included text="Insights com IA" />
            <FeatureItem included text="Suporte prioritário" />
            <FeatureItem included text="Acesso à API" />
          </>
        )}
      </ul>

      {/* CTA */}
      <Button
        onClick={onSelect}
        disabled={isCurrentPlan}
        className={`w-full py-6 text-base font-semibold ${
          tier.popular
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/25'
            : tier.id === 'business'
            ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white'
            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
        }`}
      >
        {isCurrentPlan ? (
          'Plano Atual'
        ) : (
          <>
            {tier.id === 'free' ? 'Começar Grátis' : 'Assinar Agora'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
    </motion.div>
  );
}

// Feature Item
function FeatureItem({ included, text }: { included: boolean; text: string }) {
  return (
    <li className="flex items-center gap-3">
      {included ? (
        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
          <Check className="w-3 h-3 text-green-400" />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center">
          <X className="w-3 h-3 text-slate-500" />
        </div>
      )}
      <span className={included ? 'text-slate-300' : 'text-slate-500'}>{text}</span>
    </li>
  );
}

// Feature Row for comparison table
function FeatureRow({
  name,
  values,
  isBoolean = false,
}: {
  name: string;
  values: (string | boolean)[];
  isBoolean?: boolean;
}) {
  return (
    <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
      <div className="text-slate-300">{name}</div>
      {values.map((value, index) => (
        <div key={index} className="text-center">
          {isBoolean ? (
            value ? (
              <Check className="w-5 h-5 text-green-400 mx-auto" />
            ) : (
              <X className="w-5 h-5 text-slate-600 mx-auto" />
            )
          ) : (
            <span className="text-white font-medium">{value}</span>
          )}
        </div>
      ))}
    </div>
  );
}