'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, Crown, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSubscription } from '@/hooks/useSubscription';
import {
  FEATURE_DESCRIPTIONS,
  getUpgradeTier,
  TierLimits,
} from '@/lib/subscription';

interface UpgradePromptProps {
  feature?: keyof TierLimits['features'];
  reason?: 'limit_reached' | 'feature_locked' | 'upgrade';
  onClose?: () => void;
  isOpen?: boolean;
}

export function UpgradePrompt({
  feature,
  reason = 'upgrade',
  onClose,
  isOpen = true,
}: UpgradePromptProps) {
  const router = useRouter();
  const { tier, remainingAnalyses, tierInfo } = useSubscription();
  const upgradeTier = getUpgradeTier(tier);

  if (!isOpen || !upgradeTier) return null;

  const featureInfo = feature ? FEATURE_DESCRIPTIONS[feature] : null;

  const getTitle = () => {
    switch (reason) {
      case 'limit_reached':
        return 'Limite de análises atingido';
      case 'feature_locked':
        return featureInfo?.name || 'Recurso Premium';
      default:
        return 'Desbloqueie todo o potencial';
    }
  };

  const getMessage = () => {
    switch (reason) {
      case 'limit_reached':
        return `Você utilizou todas as ${tierInfo.limits.analysesPerMonth} análises do plano ${tierInfo.name} este mês.`;
      case 'feature_locked':
        return featureInfo?.description || 'Este recurso está disponível apenas para assinantes.';
      default:
        return 'Faça upgrade para desbloquear análises ilimitadas e recursos avançados.';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                {reason === 'limit_reached' ? (
                  <Zap className="w-10 h-10 text-white" />
                ) : reason === 'feature_locked' ? (
                  <Lock className="w-10 h-10 text-white" />
                ) : (
                  <Crown className="w-10 h-10 text-white" />
                )}
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-white text-center mb-3">
            {getTitle()}
          </h2>
          <p className="text-slate-400 text-center mb-8">{getMessage()}</p>

          {/* Benefits */}
          <div className="space-y-3 mb-8">
            <BenefitItem text="Análises ilimitadas por mês" />
            <BenefitItem text="Detector de bloqueios avançado" />
            <BenefitItem text="Comparação temporal de análises" />
            <BenefitItem text="Exportar relatórios em PDF" />
            <BenefitItem text="Insights e recomendações avançadas" />
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <span className="text-slate-400 text-sm">A partir de</span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-bold text-white">
                €{upgradeTier.price.monthly}
              </span>
              <span className="text-slate-400">/mês</span>
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={() => router.push('/pricing')}
            className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-lg"
          >
            Fazer Upgrade para {upgradeTier.name}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Skip */}
          {onClose && (
            <button
              onClick={onClose}
              className="w-full mt-4 text-slate-400 hover:text-white text-sm transition-colors"
            >
              Continuar com plano {tierInfo.name}
            </button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function BenefitItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-3 h-3 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span className="text-slate-300 text-sm">{text}</span>
    </div>
  );
}

// Componente wrapper para features bloqueadas
interface FeatureGateProps {
  feature: keyof TierLimits['features'];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function FeatureGate({ feature, children, fallback }: FeatureGateProps) {
  const { canUseFeature, isLoading } = useSubscription();

  if (isLoading) {
    return (
      <div className="animate-pulse bg-slate-800/50 rounded-lg h-32" />
    );
  }

  if (!canUseFeature(feature)) {
    return fallback || <LockedFeatureCard feature={feature} />;
  }

  return <>{children}</>;
}

// Card para feature bloqueada
function LockedFeatureCard({ feature }: { feature: keyof TierLimits['features'] }) {
  const router = useRouter();
  const featureInfo = FEATURE_DESCRIPTIONS[feature];

  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 p-6">
      {/* Blur overlay */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
          <Lock className="w-6 h-6 text-purple-400" />
        </div>
        <h3 className="text-white font-semibold mb-2">{featureInfo.name}</h3>
        <p className="text-slate-400 text-sm text-center max-w-xs mb-4">
          {featureInfo.description}
        </p>
        <Button
          size="sm"
          onClick={() => router.push('/pricing')}
          className="bg-gradient-to-r from-purple-500 to-pink-500"
        >
          <Zap className="w-4 h-4 mr-2" />
          Desbloquear
        </Button>
      </div>

      {/* Placeholder content */}
      <div className="opacity-30">
        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4" />
        <div className="space-y-2">
          <div className="h-4 bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-700 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
}

// Badge de uso de análises
export function UsageBadge() {
  const { tier, remainingAnalyses, limits, usedAnalyses } = useSubscription();

  if (limits.analysesPerMonth === -1) {
    return (
      <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1.5 rounded-full text-sm">
        <Zap className="w-4 h-4" />
        Análises Ilimitadas
      </div>
    );
  }

  const percentage = (usedAnalyses / limits.analysesPerMonth) * 100;
  const isLow = remainingAnalyses <= 1;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
        isLow
          ? 'bg-red-500/20 text-red-400'
          : 'bg-purple-500/20 text-purple-400'
      }`}
    >
      <div className="w-16 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            isLow ? 'bg-red-400' : 'bg-purple-400'
          }`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <span>
        {remainingAnalyses}/{limits.analysesPerMonth} análises
      </span>
    </div>
  );
}