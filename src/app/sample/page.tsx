'use client';

import { motion } from 'framer-motion';
import { 
  Users, UserMinus, UserX, Shield, TrendingUp, TrendingDown,
  Eye, ArrowRight, Lock, Star, CheckCircle, Crown
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SampleReportPage() {
  const router = useRouter();

  // Sample data for demonstration
  const sampleStats = {
    followers: 2847,
    following: 1923,
    notFollowingBack: 847,
    notFollowingBackPercentage: 44,
    mutualFollowers: 1076,
    possibleBlocks: 12,
    closeFriends: 23,
    recentUnfollowers: 34,
  };

  const sampleNotFollowingBack = [
    { username: 'travel_adventures', name: 'Travel Adventures ✈️', verified: true },
    { username: 'fitness.guru', name: 'Fitness Guru 💪', verified: false },
    { username: 'food_lover_pt', name: 'Food Lover Portugal', verified: false },
    { username: 'tech_news_daily', name: 'Tech News Daily', verified: true },
    { username: 'photography.art', name: 'Photography Art', verified: false },
  ];

  return (
    <div className="min-h-screen app-bg-animated">
      <div className="bg-decorations" />
      <div className="bg-grid" />

      <Header showNav={true} />

      <main className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 mb-6">
            <Eye className="w-4 h-4" />
            <span className="text-sm font-medium">Exemplo de Análise</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Veja o que você vai <span className="text-gradient">descobrir</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Este é um exemplo real de análise do FollowerScan. Os dados são fictícios
            para demonstrar as funcionalidades disponíveis.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="glass-card p-4 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{sampleStats.followers.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Seguidores</div>
          </Card>
          <Card className="glass-card p-4 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{sampleStats.following.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Seguindo</div>
          </Card>
          <Card className="glass-card p-4 text-center">
            <UserMinus className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{sampleStats.notFollowingBack}</div>
            <div className="text-slate-400 text-sm">Não seguem de volta</div>
          </Card>
          <Card className="glass-card p-4 text-center">
            <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{sampleStats.mutualFollowers.toLocaleString()}</div>
            <div className="text-slate-400 text-sm">Mútuos</div>
          </Card>
        </motion.div>

        {/* Main Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 mb-8"
        >
          {/* Not Following Back */}
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                  <UserMinus className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Não Seguem de Volta</h3>
                  <p className="text-slate-400 text-sm">{sampleStats.notFollowingBack} contas</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-red-400">
                  {sampleStats.notFollowingBackPercentage}%
                </div>
                <div className="text-slate-500 text-xs">do total seguindo</div>
              </div>
            </div>

            {/* Sample List */}
            <div className="space-y-3 mb-4">
              {sampleNotFollowingBack.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-white font-medium">{user.username}</span>
                        {user.verified && (
                          <CheckCircle className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                      <div className="text-slate-400 text-sm">{user.name}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Blur overlay for remaining */}
            <div className="relative">
              <div className="space-y-3 filter blur-sm">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                    <div className="w-10 h-10 rounded-full bg-slate-700" />
                    <div className="flex-1">
                      <div className="h-4 bg-slate-700 rounded w-32 mb-1" />
                      <div className="h-3 bg-slate-700 rounded w-24" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-lg">
                <div className="text-center">
                  <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300 font-medium">+{sampleStats.notFollowingBack - 5} mais</p>
                  <p className="text-slate-500 text-sm">Faça upload para ver todos</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Insights */}
          <div className="space-y-4">
            {/* Possible Blocks - Premium Feature */}
            <Card className="glass-card p-6 border-amber-500/30">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <UserX className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Possíveis Bloqueios</h3>
                    <p className="text-slate-400 text-sm">{sampleStats.possibleBlocks} detectados</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-400 text-xs">
                  <Crown className="w-3 h-3" />
                  Pro
                </div>
              </div>
              <div className="relative">
                <div className="space-y-2 filter blur-sm">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded bg-white/5">
                      <div className="w-8 h-8 rounded-full bg-slate-700" />
                      <div className="h-3 bg-slate-700 rounded w-24" />
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button 
                    onClick={() => router.push('/pricing')}
                    className="btn-primary text-sm"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade para Pro
                  </Button>
                </div>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Unfollows Recentes</h3>
                  <p className="text-slate-400 text-sm">{sampleStats.recentUnfollowers} nos últimos 30 dias</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Compare análises ao longo do tempo para ver quem deixou de te seguir.
              </p>
            </Card>

            {/* Close Friends */}
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Melhores Amigos</h3>
                  <p className="text-slate-400 text-sm">{sampleStats.closeFriends} na sua lista</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm">
                Analise sua lista de melhores amigos e veja quem está nela.
              </p>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card p-8 text-center border-purple-500/30 bg-purple-500/5">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para analisar <span className="text-gradient">sua conta</span>?
            </h2>
            <p className="text-slate-400 mb-6 max-w-xl mx-auto">
              Em menos de 5 minutos, descubra quem não te segue de volta,
              detecte bloqueios e obtenha insights valiosos sobre seus seguidores.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => router.push('/tutorial')}
                className="btn-primary px-8 py-4"
              >
                Começar Agora - É Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                onClick={() => router.push('/pricing')}
                className="btn-secondary px-8 py-4"
              >
                Ver Planos Pro
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span>100% Privado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Sem necessidade de senha</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}