/**
 * FollowerScan - Sistema de Subscription & Tiers
 * Gerencia limites, features e validações por plano
 */

export type SubscriptionTier = 'free' | 'pro' | 'business';

export interface TierLimits {
  analysesPerMonth: number;
  historyDays: number;
  maxAccounts: number;
  features: {
    blockDetector: boolean;
    exportPdf: boolean;
    exportCsv: boolean;
    temporalComparison: boolean;
    advancedInsights: boolean;
    aiInsights: boolean;
    prioritySupport: boolean;
    apiAccess: boolean;
    whiteLabel: boolean;
  };
}

export interface PricingTier {
  id: SubscriptionTier;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  stripePriceId: {
    monthly: string;
    yearly: string;
  };
  limits: TierLimits;
  popular?: boolean;
  badge?: string;
}

// Configuração dos tiers
export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'free',
    name: 'Gratuito',
    description: 'Para quem quer começar a analisar seus seguidores',
    price: {
      monthly: 0,
      yearly: 0,
    },
    stripePriceId: {
      monthly: '',
      yearly: '',
    },
    limits: {
      analysesPerMonth: 3,
      historyDays: 7,
      maxAccounts: 1,
      features: {
        blockDetector: false,
        exportPdf: false,
        exportCsv: true,
        temporalComparison: false,
        advancedInsights: false,
        aiInsights: false,
        prioritySupport: false,
        apiAccess: false,
        whiteLabel: false,
      },
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Para criadores de conteúdo e influenciadores',
    price: {
      monthly: 4.99,
      yearly: 49.99,
    },
    stripePriceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || '',
      yearly: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID || '',
    },
    limits: {
      analysesPerMonth: -1, // Ilimitado
      historyDays: 90,
      maxAccounts: 3,
      features: {
        blockDetector: true,
        exportPdf: true,
        exportCsv: true,
        temporalComparison: true,
        advancedInsights: true,
        aiInsights: false,
        prioritySupport: false,
        apiAccess: false,
        whiteLabel: false,
      },
    },
    popular: true,
    badge: 'Mais Popular',
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Para agências e gestores de múltiplas contas',
    price: {
      monthly: 14.99,
      yearly: 149.99,
    },
    stripePriceId: {
      monthly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_MONTHLY_PRICE_ID || '',
      yearly: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_YEARLY_PRICE_ID || '',
    },
    limits: {
      analysesPerMonth: -1,
      historyDays: -1, // Ilimitado
      maxAccounts: 10,
      features: {
        blockDetector: true,
        exportPdf: true,
        exportCsv: true,
        temporalComparison: true,
        advancedInsights: true,
        aiInsights: true,
        prioritySupport: true,
        apiAccess: true,
        whiteLabel: true,
      },
    },
    badge: 'Para Agências',
  },
];

// Helpers
export function getTierById(tierId: SubscriptionTier): PricingTier {
  return PRICING_TIERS.find(t => t.id === tierId) || PRICING_TIERS[0];
}

export function getTierLimits(tierId: SubscriptionTier): TierLimits {
  return getTierById(tierId).limits;
}

export function canAccessFeature(
  tierId: SubscriptionTier,
  feature: keyof TierLimits['features']
): boolean {
  const limits = getTierLimits(tierId);
  return limits.features[feature];
}

export function getRemainingAnalyses(
  tierId: SubscriptionTier,
  usedAnalyses: number
): number {
  const limits = getTierLimits(tierId);
  if (limits.analysesPerMonth === -1) return -1; // Ilimitado
  return Math.max(0, limits.analysesPerMonth - usedAnalyses);
}

export function hasReachedLimit(
  tierId: SubscriptionTier,
  usedAnalyses: number
): boolean {
  const limits = getTierLimits(tierId);
  if (limits.analysesPerMonth === -1) return false;
  return usedAnalyses >= limits.analysesPerMonth;
}

export function getUpgradeTier(currentTier: SubscriptionTier): PricingTier | null {
  const tierOrder: SubscriptionTier[] = ['free', 'pro', 'business'];
  const currentIndex = tierOrder.indexOf(currentTier);
  if (currentIndex < tierOrder.length - 1) {
    return getTierById(tierOrder[currentIndex + 1]);
  }
  return null;
}

// Feature descriptions para UI
export const FEATURE_DESCRIPTIONS: Record<keyof TierLimits['features'], {
  name: string;
  description: string;
  icon: string;
}> = {
  blockDetector: {
    name: 'Detector de Bloqueios',
    description: 'Algoritmo avançado que identifica quem pode ter te bloqueado',
    icon: '🚫',
  },
  exportPdf: {
    name: 'Exportar PDF',
    description: 'Gere relatórios profissionais em PDF',
    icon: '📄',
  },
  exportCsv: {
    name: 'Exportar CSV',
    description: 'Exporte listas para planilhas',
    icon: '📊',
  },
  temporalComparison: {
    name: 'Comparação Temporal',
    description: 'Compare análises ao longo do tempo',
    icon: '📈',
  },
  advancedInsights: {
    name: 'Insights Avançados',
    description: 'Métricas detalhadas e recomendações',
    icon: '💡',
  },
  aiInsights: {
    name: 'Insights com IA',
    description: 'Análise inteligente com recomendações personalizadas',
    icon: '🤖',
  },
  prioritySupport: {
    name: 'Suporte Prioritário',
    description: 'Resposta em até 24h via email',
    icon: '⚡',
  },
  apiAccess: {
    name: 'Acesso à API',
    description: 'Integre com suas ferramentas',
    icon: '🔌',
  },
  whiteLabel: {
    name: 'White Label',
    description: 'Remova a marca FollowerScan',
    icon: '🏷️',
  },
};