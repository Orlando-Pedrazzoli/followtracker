'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUser, UserButton } from '@clerk/nextjs';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Upload,
  BarChart3,
  Save,
  Share2,
  Download,
  History,
  Trash2,
  RefreshCw,
  UserMinus,
  Ban,
  AlertTriangle,
  Users,
  UserCheck,
  Heart,
  Ghost,
  ChevronDown,
  ChevronUp,
  Eye,
  Crown,
  Zap,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CompleteAnalysis } from '@/types/instagram';
import { InstagramAnalyzer, HistoryManager } from '@/lib/instagram-parser';
import { useSubscription } from '@/hooks/useSubscription';
import {
  UpgradePrompt,
  FeatureGate,
  UsageBadge,
} from '@/components/subscription/UpgradePrompt';
import toast from 'react-hot-toast';

// Componente principal envolvido em Suspense
export default function DashboardAnalyzePageWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <DashboardAnalyzePage />
    </Suspense>
  );
}

// Loading screen
function LoadingScreen() {
  return (
    <div className="min-h-screen app-bg-animated flex items-center justify-center">
      <div className="bg-decorations" />
      <div className="text-center relative z-10">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-white text-lg">Carregando...</p>
      </div>
    </div>
  );
}

function DashboardAnalyzePage() {
  const [analysis, setAnalysis] = useState<CompleteAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('not-following-back');
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [upgradeReason, setUpgradeReason] = useState<'limit_reached' | 'feature_locked'>('limit_reached');
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();
  const {
    tier,
    isLoading: subscriptionLoading,
    hasReachedAnalysisLimit,
    canUseFeature,
    remainingAnalyses,
    incrementAnalysis,
    tierInfo,
    isProOrHigher,
  } = useSubscription();

  // Pagination states
  const INITIAL_ITEMS_TO_SHOW = 50;
  const ITEMS_INCREMENT = 50;
  const [notFollowingItemsToShow, setNotFollowingItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);
  const [mutualItemsToShow, setMutualItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);
  const [notFollowedItemsToShow, setNotFollowedItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      toast.success('🎉 Assinatura ativada com sucesso!', { duration: 5000 });
    }
  }, [searchParams]);

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = () => {
    try {
      const currentAnalysis = localStorage.getItem('current-analysis');

      if (currentAnalysis) {
        const analysisData = JSON.parse(currentAnalysis);
        setAnalysis(analysisData);
        setIsLoading(false);

        if (canUseFeature('blockDetector')) {
          const comparison = HistoryManager.compareWithPrevious(analysisData);
          if (comparison && comparison.changes.possibleBlocks.length > 0) {
            analysisData.relationships.suspicious = comparison.changes.possibleBlocks;
            setAnalysis({ ...analysisData });
            toast.error(
              `⚠️ ${comparison.changes.possibleBlocks.length} possíveis bloqueios detectados!`,
              { duration: 5000 }
            );
          }
        }

        if (analysisData.stats.notFollowingBackCount > 0) {
          toast.error(
            `😢 ${analysisData.stats.notFollowingBackCount} pessoas não te seguem de volta!`,
            { duration: 6000, icon: '🚫' }
          );
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao carregar análise:', error);
      setIsLoading(false);
    }
  };

  const handleNewAnalysis = () => {
    if (hasReachedAnalysisLimit) {
      setUpgradeReason('limit_reached');
      setShowUpgradePrompt(true);
      return;
    }
    router.push('/upload');
  };

  const exportToCSV = (data: any[], filename: string) => {
    const csv = data
      .map(user => `${user.username},${user.href || `https://instagram.com/${user.username}`}`)
      .join('\n');
    const blob = new Blob([`Username,Profile Link\n${csv}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Lista exportada com sucesso!');
  };

  const handleExportPDF = () => {
    if (!canUseFeature('exportPdf')) {
      setUpgradeReason('feature_locked');
      setShowUpgradePrompt(true);
      return;
    }
    toast.success('Exportando PDF...');
  };

  const handleShare = async () => {
    if (!analysis) return;

    const text = `📊 Minha Análise do Instagram:
    
🚫 ${analysis.stats.notFollowingBackCount} não me seguem de volta
✅ ${analysis.stats.mutualCount} seguidores mútuos
📈 ${analysis.stats.engagementRatio.toFixed(1)}% de engajamento

Faça sua análise em: www.followerscan.com`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Análise do Instagram', text });
      } catch {
        navigator.clipboard.writeText(text);
        toast.success('Copiado para área de transferência!');
      }
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Copiado para área de transferência!');
    }
  };

  const clearAnalysis = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados?')) {
      localStorage.removeItem('current-analysis');
      localStorage.removeItem('current-analysis-id');
      HistoryManager.clearHistory();
      toast.success('Dados limpos com sucesso!');
      router.push('/upload');
    }
  };

  const handleShowMore = (type: 'notFollowing' | 'mutual' | 'notFollowed') => {
    switch (type) {
      case 'notFollowing':
        setNotFollowingItemsToShow(prev => prev + ITEMS_INCREMENT);
        break;
      case 'mutual':
        setMutualItemsToShow(prev => prev + ITEMS_INCREMENT);
        break;
      case 'notFollowed':
        setNotFollowedItemsToShow(prev => prev + ITEMS_INCREMENT);
        break;
    }
  };

  if (isLoading || subscriptionLoading) {
    return <LoadingScreen />;
  }

  if (!analysis) {
    return (
      <div className="min-h-screen app-bg-animated flex flex-col">
        <div className="bg-decorations" />
        <div className="bg-grid" />
        
        <Header showNav={true} />
        
        <main className="container mx-auto px-4 py-16 flex-1 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-white text-3xl font-bold mb-4">
                Nenhuma análise encontrada
              </h2>
              <p className="text-slate-400 text-lg max-w-md mx-auto mb-4">
                Faça upload dos seus arquivos do Instagram para descobrir quem não te segue de volta.
              </p>
              <UsageBadge />
            </motion.div>
            <Button
              onClick={handleNewAnalysis}
              className="btn-primary"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Fazer Upload
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen app-bg-animated flex flex-col">
      {/* Background Decorations */}
      <div className="bg-decorations" />
      <div className="bg-grid" />

      <Header
        subtitle={`${analysis.stats.notFollowingBackCount} não te seguem de volta`}
        showNav={true}
        rightContent={
          <div className="flex items-center gap-2">
            <UsageBadge />
            <Button variant="ghost" onClick={handleShare} className="btn-ghost hidden md:flex">
              <Share2 className="w-4 h-4 mr-2" />
              Compartilhar
            </Button>
            <Button variant="ghost" onClick={clearAnalysis} className="btn-ghost hidden md:flex">
              <Trash2 className="w-4 h-4 mr-2" />
              Limpar
            </Button>
            <Button onClick={handleNewAnalysis} className="btn-primary">
              <RefreshCw className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Nova</span>
            </Button>
            {user && <UserButton afterSignOutUrl="/" />}
          </div>
        }
      />

      <main className="container mx-auto px-4 py-8 flex-1 relative z-10">
        {/* Main Alert */}
        {analysis.stats.notFollowingBackCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="alert-card-danger p-6">
              <div className="flex items-center gap-4">
                <AlertTriangle className="w-12 h-12 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-red-300">
                    {analysis.stats.notFollowingBackCount} pessoas não te seguem de volta!
                  </h3>
                  <p className="text-red-200/80">
                    Você segue essas pessoas mas elas não te seguem.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Block Detection Alert - Pro Feature */}
        <FeatureGate
          feature="blockDetector"
          fallback={
            analysis.relationships.suspicious.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Card className="alert-card-warning relative overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="text-center">
                      <Lock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <p className="text-white font-semibold">Detector de Bloqueios</p>
                      <p className="text-slate-400 text-sm mb-3">Recurso exclusivo Pro</p>
                      <Button
                        size="sm"
                        onClick={() => router.push('/pricing')}
                        className="btn-primary"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Desbloquear
                      </Button>
                    </div>
                  </div>
                  <CardContent className="pt-6 opacity-30">
                    <div className="flex items-center gap-4">
                      <Ban className="w-12 h-12 text-yellow-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-xl font-bold text-yellow-300">
                          Possíveis bloqueios detectados
                        </h3>
                        <p className="text-yellow-200/80">
                          Faça upgrade para ver quem pode ter te bloqueado.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : null
          }
        >
          {analysis.relationships.suspicious.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Card className="alert-card-warning p-6">
                <div className="flex items-center gap-4">
                  <Ban className="w-12 h-12 text-yellow-400 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300">
                      {analysis.relationships.suspicious.length} possíveis bloqueios detectados
                    </h3>
                    <p className="text-yellow-200/80">
                      Esses perfis sumiram sem aparecer nos unfollows recentes.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </FeatureGate>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            value={analysis.stats.totalFollowers}
            label="Seguidores"
            color="blue"
          />
          <StatCard
            icon={<UserCheck className="w-6 h-6" />}
            value={analysis.stats.totalFollowing}
            label="Seguindo"
            color="purple"
          />
          <StatCard
            icon={<UserMinus className="w-6 h-6" />}
            value={analysis.stats.notFollowingBackCount}
            label="Não te seguem"
            color="red"
            highlight
          />
          <StatCard
            icon={<Heart className="w-6 h-6" />}
            value={analysis.stats.mutualCount}
            label="Mútuos"
            color="green"
          />
          <StatCard
            icon={<BarChart3 className="w-6 h-6" />}
            value={`${analysis.stats.engagementRatio.toFixed(1)}%`}
            label="Engajamento"
            color="purple"
          />
        </div>

        {/* Analysis Tabs */}
        <Card className="glass-card">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 bg-white/5">
              <TabsTrigger value="not-following-back" className="text-xs md:text-sm data-[state=active]:bg-red-500/20">
                <UserMinus className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Não Seguem</span> ({analysis.stats.notFollowingBackCount})
              </TabsTrigger>
              <TabsTrigger value="suspicious" className="text-xs md:text-sm data-[state=active]:bg-yellow-500/20">
                <Ban className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Bloqueios</span> ({analysis.relationships.suspicious.length})
                {!isProOrHigher && <Lock className="w-3 h-3 ml-1 text-slate-500" />}
              </TabsTrigger>
              <TabsTrigger value="mutual" className="text-xs md:text-sm data-[state=active]:bg-green-500/20">
                <Heart className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Mútuos</span> ({analysis.stats.mutualCount})
              </TabsTrigger>
              <TabsTrigger value="not-followed" className="text-xs md:text-sm data-[state=active]:bg-blue-500/20">
                <Users className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Não Seguidos</span> ({analysis.stats.notFollowedBackCount})
              </TabsTrigger>
              <TabsTrigger value="ghosts" className="text-xs md:text-sm data-[state=active]:bg-purple-500/20">
                <Ghost className="w-4 h-4 mr-1" />
                <span className="hidden md:inline">Unfollows</span> ({analysis.relationships.ghosts.length})
              </TabsTrigger>
            </TabsList>

            {/* Not Following Back Tab */}
            <TabsContent value="not-following-back">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-red-400">
                      Pessoas que você segue mas não te seguem de volta
                    </CardTitle>
                    <p className="text-slate-400 text-sm mt-1">
                      Total: {analysis.stats.notFollowingBackCount} pessoas
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => exportToCSV(analysis.relationships.notFollowingBack, 'nao_te_seguem.csv')}
                      size="sm"
                      className="btn-secondary"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      CSV
                    </Button>
                    <Button
                      onClick={handleExportPDF}
                      size="sm"
                      className="btn-secondary"
                    >
                      {!canUseFeature('exportPdf') && <Lock className="w-3 h-3 mr-1" />}
                      PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analysis.relationships.notFollowingBack
                    .slice(0, notFollowingItemsToShow)
                    .map((user, index) => (
                      <UserCard key={index} user={user} variant="danger" />
                    ))}
                </div>
                {analysis.relationships.notFollowingBack.length > notFollowingItemsToShow && (
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => handleShowMore('notFollowing')}
                      className="btn-secondary"
                    >
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Mostrar mais {ITEMS_INCREMENT}
                    </Button>
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Suspicious Tab - Pro Feature */}
            <TabsContent value="suspicious">
              <FeatureGate feature="blockDetector">
                <CardHeader>
                  <CardTitle className="text-yellow-400">
                    Possíveis Bloqueios (Beta)
                  </CardTitle>
                  <p className="text-slate-400 text-sm">
                    Perfis que sumiram sem aparecer nos unfollows
                  </p>
                </CardHeader>
                <CardContent>
                  {analysis.relationships.suspicious.length === 0 ? (
                    <div className="text-center py-8">
                      <Ban className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                      <p className="text-slate-400">Nenhum bloqueio suspeito detectado</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {analysis.relationships.suspicious.map((user, index) => (
                        <UserCard key={index} user={user} variant="warning" />
                      ))}
                    </div>
                  )}
                </CardContent>
              </FeatureGate>
            </TabsContent>

            {/* Mutual Tab */}
            <TabsContent value="mutual">
              <CardHeader>
                <CardTitle className="text-green-400">Seguidores Mútuos</CardTitle>
                <p className="text-slate-400 text-sm">
                  Pessoas que vocês se seguem mutuamente
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analysis.relationships.mutual
                    .slice(0, mutualItemsToShow)
                    .map((user, index) => (
                      <UserCard key={index} user={user} variant="success" />
                    ))}
                </div>
                {analysis.relationships.mutual.length > mutualItemsToShow && (
                  <div className="flex justify-center mt-6">
                    <Button
                      onClick={() => handleShowMore('mutual')}
                      className="btn-secondary"
                    >
                      <ChevronDown className="w-4 h-4 mr-2" />
                      Mostrar mais
                    </Button>
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Not Followed Tab */}
            <TabsContent value="not-followed">
              <CardHeader>
                <CardTitle className="text-blue-400">
                  Pessoas que te seguem mas você não segue
                </CardTitle>
                <p className="text-slate-400 text-sm">
                  Potenciais seguidores para seguir de volta
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {analysis.relationships.notFollowedBack
                    .slice(0, notFollowedItemsToShow)
                    .map((user, index) => (
                      <UserCard key={index} user={user} variant="info" />
                    ))}
                </div>
              </CardContent>
            </TabsContent>

            {/* Ghosts Tab */}
            <TabsContent value="ghosts">
              <CardHeader>
                <CardTitle className="text-purple-400">Unfollows Recentes</CardTitle>
                <p className="text-slate-400 text-sm">
                  Pessoas que você deixou de seguir recentemente
                </p>
              </CardHeader>
              <CardContent>
                {analysis.relationships.ghosts.length === 0 ? (
                  <div className="text-center py-8">
                    <Ghost className="w-12 h-12 mx-auto text-slate-600 mb-4" />
                    <p className="text-slate-400">Nenhum unfollow recente</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {analysis.relationships.ghosts.map((user, index) => (
                      <UserCard key={index} user={user} variant="ghost" />
                    ))}
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <Footer />

      <UpgradePrompt
        isOpen={showUpgradePrompt}
        reason={upgradeReason}
        onClose={() => setShowUpgradePrompt(false)}
      />
    </div>
  );
}

// Stat Card Component
function StatCard({
  icon,
  value,
  label,
  color,
  highlight,
}: {
  icon: React.ReactNode;
  value: number | string;
  label: string;
  color: 'blue' | 'purple' | 'red' | 'green';
  highlight?: boolean;
}) {
  const colorClasses = {
    blue: 'text-blue-400 bg-blue-500/20 border-blue-500/30',
    purple: 'text-purple-400 bg-purple-500/20 border-purple-500/30',
    red: 'text-red-400 bg-red-500/20 border-red-500/30',
    green: 'text-green-400 bg-green-500/20 border-green-500/30',
  };

  return (
    <Card
      className={`border backdrop-blur-xl ${
        highlight ? `solid-card ${colorClasses[color]}` : 'solid-card'
      }`}
    >
      <CardContent className="pt-6 text-center">
        <div className={`mx-auto mb-2 ${colorClasses[color].split(' ')[0]}`}>{icon}</div>
        <div className={`text-2xl font-bold ${highlight ? colorClasses[color].split(' ')[0] : 'text-white'}`}>
          {value}
        </div>
        <div className="text-sm text-slate-400">{label}</div>
      </CardContent>
    </Card>
  );
}

// User Card Component
function UserCard({
  user,
  variant,
}: {
  user: { username: string; href?: string; timestamp?: number };
  variant: 'danger' | 'warning' | 'success' | 'info' | 'ghost';
}) {
  const variantClasses = {
    danger: 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20',
    warning: 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20',
    success: 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20',
    info: 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20',
    ghost: 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20',
  };

  const linkColors = {
    danger: 'text-red-400 hover:text-red-300',
    warning: 'text-yellow-400 hover:text-yellow-300',
    success: 'text-green-400 hover:text-green-300',
    info: 'text-blue-400 hover:text-blue-300',
    ghost: 'text-purple-400 hover:text-purple-300',
  };

  return (
    <div className={`rounded-lg border p-3 transition-colors ${variantClasses[variant]}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">@{user.username}</div>
          {user.timestamp && (
            <div className="text-xs text-slate-500">
              {Math.floor((Date.now() / 1000 - user.timestamp) / 86400)} dias
            </div>
          )}
        </div>
        <a
          href={user.href || `https://instagram.com/${user.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-medium ${linkColors[variant]}`}
        >
          Ver →
        </a>
      </div>
    </div>
  );
}