'use client';

import { useUser } from '@clerk/nextjs';
import { useState, useEffect, useCallback } from 'react';
import {
  SubscriptionTier,
  getTierById,
  getTierLimits,
  canAccessFeature,
  hasReachedLimit,
  getRemainingAnalyses,
  TierLimits,
  PricingTier,
} from '@/lib/subscription';

interface SubscriptionState {
  tier: SubscriptionTier;
  isLoading: boolean;
  usedAnalyses: number;
  periodEnd: Date | null;
  stripeCustomerId: string | null;
}

interface UseSubscriptionReturn extends SubscriptionState {
  tierInfo: PricingTier;
  limits: TierLimits;
  canUseFeature: (feature: keyof TierLimits['features']) => boolean;
  remainingAnalyses: number;
  hasReachedAnalysisLimit: boolean;
  incrementAnalysis: () => Promise<void>;
  refreshSubscription: () => Promise<void>;
  isProOrHigher: boolean;
  isBusiness: boolean;
}

// Chave para localStorage
const USAGE_KEY = 'followerscan-usage';
const USAGE_RESET_KEY = 'followerscan-usage-reset';

interface UsageData {
  count: number;
  month: number;
  year: number;
}

function getStoredUsage(): UsageData {
  if (typeof window === 'undefined') {
    return { count: 0, month: new Date().getMonth(), year: new Date().getFullYear() };
  }
  
  const stored = localStorage.getItem(USAGE_KEY);
  if (!stored) {
    return { count: 0, month: new Date().getMonth(), year: new Date().getFullYear() };
  }
  
  const data: UsageData = JSON.parse(stored);
  const now = new Date();
  
  // Reset se mudou o mês
  if (data.month !== now.getMonth() || data.year !== now.getFullYear()) {
    const newData = { count: 0, month: now.getMonth(), year: now.getFullYear() };
    localStorage.setItem(USAGE_KEY, JSON.stringify(newData));
    return newData;
  }
  
  return data;
}

function setStoredUsage(count: number): void {
  if (typeof window === 'undefined') return;
  
  const now = new Date();
  const data: UsageData = { count, month: now.getMonth(), year: now.getFullYear() };
  localStorage.setItem(USAGE_KEY, JSON.stringify(data));
}

export function useSubscription(): UseSubscriptionReturn {
  const { user, isLoaded } = useUser();
  
  const [state, setState] = useState<SubscriptionState>({
    tier: 'free',
    isLoading: true,
    usedAnalyses: 0,
    periodEnd: null,
    stripeCustomerId: null,
  });

  // Carregar dados da subscription do Clerk metadata
  const loadSubscription = useCallback(async () => {
    if (!isLoaded) return;

    try {
      // Usuário não logado = free tier
      if (!user) {
        const usage = getStoredUsage();
        setState({
          tier: 'free',
          isLoading: false,
          usedAnalyses: usage.count,
          periodEnd: null,
          stripeCustomerId: null,
        });
        return;
      }

      // Buscar metadata do usuário no Clerk
      const publicMetadata = user.publicMetadata as {
        subscriptionTier?: SubscriptionTier;
        stripeCustomerId?: string;
        subscriptionPeriodEnd?: string;
        usedAnalyses?: number;
      };

      const tier = publicMetadata.subscriptionTier || 'free';
      
      // Para free tier, usar localStorage
      // Para paid tiers, usar metadata do Clerk
      let usedAnalyses = 0;
      if (tier === 'free') {
        usedAnalyses = getStoredUsage().count;
      } else {
        usedAnalyses = publicMetadata.usedAnalyses || 0;
      }

      setState({
        tier,
        isLoading: false,
        usedAnalyses,
        periodEnd: publicMetadata.subscriptionPeriodEnd 
          ? new Date(publicMetadata.subscriptionPeriodEnd) 
          : null,
        stripeCustomerId: publicMetadata.stripeCustomerId || null,
      });
    } catch (error) {
      console.error('Erro ao carregar subscription:', error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [user, isLoaded]);

  useEffect(() => {
    loadSubscription();
  }, [loadSubscription]);

  // Incrementar uso de análises
  const incrementAnalysis = useCallback(async () => {
    const newCount = state.usedAnalyses + 1;
    
    if (state.tier === 'free' || !user) {
      // Para free tier, salvar no localStorage
      setStoredUsage(newCount);
      setState(prev => ({ ...prev, usedAnalyses: newCount }));
    } else {
      // Para paid tiers, atualizar via API
      try {
        await fetch('/api/subscription/increment-usage', {
          method: 'POST',
        });
        setState(prev => ({ ...prev, usedAnalyses: newCount }));
      } catch (error) {
        console.error('Erro ao incrementar uso:', error);
      }
    }
  }, [state.tier, state.usedAnalyses, user]);

  // Computed values
  const tierInfo = getTierById(state.tier);
  const limits = getTierLimits(state.tier);
  const remainingAnalyses = getRemainingAnalyses(state.tier, state.usedAnalyses);
  const hasReachedAnalysisLimit = hasReachedLimit(state.tier, state.usedAnalyses);

  const canUseFeature = useCallback(
    (feature: keyof TierLimits['features']) => canAccessFeature(state.tier, feature),
    [state.tier]
  );

  return {
    ...state,
    tierInfo,
    limits,
    canUseFeature,
    remainingAnalyses,
    hasReachedAnalysisLimit,
    incrementAnalysis,
    refreshSubscription: loadSubscription,
    isProOrHigher: state.tier === 'pro' || state.tier === 'business',
    isBusiness: state.tier === 'business',
  };
}

// Hook simplificado para verificar features
export function useFeatureAccess(feature: keyof TierLimits['features']) {
  const { canUseFeature, tier, isLoading } = useSubscription();
  
  return {
    hasAccess: canUseFeature(feature),
    tier,
    isLoading,
  };
}