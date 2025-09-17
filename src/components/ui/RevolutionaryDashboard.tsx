'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserCheck,
  UserMinus,
  UserX,
  Shield,
  Clock,
  TrendingUp,
  AlertTriangle,
  Heart,
  Ghost,
  Star,
  Eye,
  EyeOff,
  Hash,
  Ban,
  UserPlus,
  ChevronRight,
  Download,
  Share2,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Info,
  X,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart,
} from 'recharts';
import {
  CompleteAnalysis,
  InstagramUser,
  Alert,
  TimelineEvent,
} from '@/types/instagram';
import toast from 'react-hot-toast';

interface DashboardProps {
  analysis: CompleteAnalysis;
  onExport?: (data: any, format: string) => void;
  onShare?: () => void;
  onCompare?: () => void;
}

const COLORS = {
  primary: '#8B5CF6',
  secondary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  muted: '#6B7280',
};

export default function RevolutionaryDashboard({
  analysis,
  onExport,
  onShare,
  onCompare,
}: DashboardProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof analysis.relationships>('mutual');
  const [showAlerts, setShowAlerts] = useState(true);

  // Calcular cores do score
  const getScoreColor = (score: number) => {
    if (score >= 80) return COLORS.success;
    if (score >= 60) return COLORS.primary;
    if (score >= 40) return COLORS.warning;
    return COLORS.danger;
  };

  // Dados para gráficos
  const pieData = [
    {
      name: 'Mútuos',
      value: analysis.relationships.mutual.length,
      color: COLORS.success,
    },
    {
      name: 'Fans',
      value: analysis.relationships.fans.length,
      color: COLORS.primary,
    },
    {
      name: 'Crushes',
      value: analysis.relationships.crushes.length,
      color: COLORS.warning,
    },
    {
      name: 'Ghosts',
      value: analysis.relationships.ghosts.length,
      color: COLORS.danger,
    },
  ];

  const radarData = [
    {
      category: 'Reciprocidade',
      value: analysis.socialHealth.reciprocityScore,
      fullMark: 100,
    },
    {
      category: 'Privacidade',
      value: analysis.socialHealth.privacyScore,
      fullMark: 100,
    },
    {
      category: 'Engajamento',
      value: analysis.socialHealth.engagementScore,
      fullMark: 100,
    },
    {
      category: 'Qualidade',
      value: analysis.socialHealth.qualityScore,
      fullMark: 100,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Alertas Importantes */}
      {showAlerts && analysis.socialHealth.alerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-2'
        >
          {analysis.socialHealth.alerts.slice(0, 3).map((alert, index) => (
            <AlertCard key={index} alert={alert} onClose={() => {}} />
          ))}
          {analysis.socialHealth.alerts.length > 3 && (
            <Button
              variant='outline'
              size='sm'
              onClick={() => setSelectedTab('insights')}
              className='w-full'
            >
              Ver todos os {analysis.socialHealth.alerts.length} alertas
              <ChevronRight className='w-4 h-4 ml-2' />
            </Button>
          )}
        </motion.div>
      )}

      {/* Score de Saúde Social */}
      <Card className='overflow-hidden'>
        <div
          className='h-2 bg-gradient-to-r'
          style={{
            background: `linear-gradient(to right, ${getScoreColor(
              analysis.socialHealth.overallScore
            )}, ${getScoreColor(analysis.socialHealth.overallScore)}88)`,
          }}
        />
        <CardContent className='pt-6'>
          <div className='flex items-center justify-between'>
            <div>
              <h3 className='text-2xl font-bold flex items-center gap-2'>
                <Sparkles className='w-6 h-6 text-purple-500' />
                Score de Saúde Social
              </h3>
              <p className='text-gray-600 mt-1'>
                Análise completa do seu perfil Instagram
              </p>
            </div>
            <div className='text-center'>
              <div
                className='text-5xl font-bold'
                style={{
                  color: getScoreColor(analysis.socialHealth.overallScore),
                }}
              >
                {Math.round(analysis.socialHealth.overallScore)}
              </div>
              <div className='text-sm text-gray-500'>de 100</div>
            </div>
          </div>

          {/* Mini Cards de Métricas */}
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mt-6'>
            <MetricCard
              icon={Users}
              label='Seguidores'
              value={analysis.stats.totalFollowers}
              trend={analysis.insights.growthRate}
              color={COLORS.primary}
            />
            <MetricCard
              icon={UserCheck}
              label='Mútuos'
              value={analysis.stats.mutualCount}
              percentage={analysis.stats.engagementRatio}
              color={COLORS.success}
            />
            <MetricCard
              icon={Ghost}
              label='Unfollows'
              value={analysis.relationships.ghosts.length}
              trend={-analysis.insights.unfollowRate}
              color={COLORS.danger}
            />
            <MetricCard
              icon={Star}
              label='VIPs'
              value={analysis.relationships.vips.length}
              color={COLORS.warning}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dashboard com Tabs */}
      <Card>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className='grid w-full grid-cols-6'>
            <TabsTrigger value='overview'>Visão Geral</TabsTrigger>
            <TabsTrigger value='followers'>Seguidores</TabsTrigger>
            <TabsTrigger value='circles'>Círculos</TabsTrigger>
            <TabsTrigger value='privacy'>Privacidade</TabsTrigger>
            <TabsTrigger value='timeline'>Timeline</TabsTrigger>
            <TabsTrigger value='insights'>Insights</TabsTrigger>
          </TabsList>

          {/* Tab: Visão Geral */}
          <TabsContent value='overview' className='space-y-6'>
            <div className='grid md:grid-cols-2 gap-6'>
              {/* Gráfico de Pizza */}
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição de Relacionamentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx='50%'
                        cy='50%'
                        labelLine={false}
                        label={renderCustomLabel}
                        outerRadius={100}
                        fill='#8884d8'
                        dataKey='value'
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Radar Chart de Saúde */}
              <Card>
                <CardHeader>
                  <CardTitle>Análise de Saúde Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width='100%' height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey='category' />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name='Score'
                        dataKey='value'
                        stroke={COLORS.primary}
                        fill={COLORS.primary}
                        fillOpacity={0.6}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Categorias Rápidas */}
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              <CategoryCard
                icon={Heart}
                title='VIPs'
                count={analysis.relationships.vips.length}
                description='Mútuos nos close friends'
                color={COLORS.warning}
                onClick={() => {
                  setSelectedTab('circles');
                  setSelectedCategory('vips');
                }}
              />
              <CategoryCard
                icon={AlertTriangle}
                title='Red Flags'
                count={analysis.relationships.redFlags.length}
                description='Close friends que não te seguem'
                color={COLORS.danger}
                onClick={() => {
                  setSelectedTab('circles');
                  setSelectedCategory('redFlags');
                }}
              />
              <CategoryCard
                icon={Ghost}
                title='Ghosts'
                count={analysis.relationships.ghosts.length}
                description='Unfollows recentes'
                color={COLORS.muted}
                onClick={() => {
                  setSelectedTab('circles');
                  setSelectedCategory('ghosts');
                }}
              />
              <CategoryCard
                icon={Eye}
                title='Stalkers'
                count={analysis.relationships.stalkers.length}
                description='Solicitações pendentes'
                color={COLORS.info}
                onClick={() => {
                  setSelectedTab('circles');
                  setSelectedCategory('stalkers');
                }}
              />
            </div>

            {/* Recomendações */}
            {analysis.socialHealth.recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Sparkles className='w-5 h-5' />
                    Recomendações Personalizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-3'>
                    {analysis.socialHealth.recommendations.map((rec, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5'>
                          <span className='text-xs font-bold text-purple-600'>
                            {index + 1}
                          </span>
                        </div>
                        <p className='text-sm text-gray-700'>{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Tab: Seguidores */}
          <TabsContent value='followers' className='space-y-6'>
            <FollowersAnalysis analysis={analysis} />
          </TabsContent>

          {/* Tab: Círculos */}
          <TabsContent value='circles' className='space-y-6'>
            <CirclesAnalysis
              analysis={analysis}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </TabsContent>

          {/* Tab: Privacidade */}
          <TabsContent value='privacy' className='space-y-6'>
            <PrivacyAnalysis analysis={analysis} />
          </TabsContent>

          {/* Tab: Timeline */}
          <TabsContent value='timeline' className='space-y-6'>
            <TimelineAnalysis analysis={analysis} />
          </TabsContent>

          {/* Tab: Insights */}
          <TabsContent value='insights' className='space-y-6'>
            <InsightsAnalysis analysis={analysis} />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

// Componentes auxiliares

function AlertCard({ alert, onClose }: { alert: Alert; onClose: () => void }) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'danger':
        return <AlertTriangle className='w-4 h-4' />;
      case 'warning':
        return <AlertCircle className='w-4 h-4' />;
      case 'success':
        return <CheckCircle className='w-4 h-4' />;
      default:
        return <Info className='w-4 h-4' />;
    }
  };

  const getAlertColor = () => {
    switch (alert.type) {
      case 'danger':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      default:
        return 'border-blue-200 bg-blue-50 text-blue-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex items-start gap-3 p-4 border rounded-lg ${getAlertColor()}`}
    >
      {getAlertIcon()}
      <div className='flex-1'>
        <h4 className='font-medium'>{alert.title}</h4>
        <p className='text-sm mt-1 opacity-90'>{alert.message}</p>
      </div>
      <button
        onClick={onClose}
        className='opacity-50 hover:opacity-100 transition-opacity'
      >
        <X className='w-4 h-4' />
      </button>
    </motion.div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  trend,
  percentage,
  color,
}: {
  icon: any;
  label: string;
  value: number;
  trend?: number;
  percentage?: number;
  color: string;
}) {
  return (
    <div className='bg-gray-50 rounded-lg p-4'>
      <div className='flex items-center justify-between mb-2'>
        <Icon className='w-5 h-5' style={{ color }} />
        {trend !== undefined && (
          <Badge
            variant={trend >= 0 ? 'default' : 'destructive'}
            className='text-xs'
          >
            {trend >= 0 ? '+' : ''}
            {trend}%
          </Badge>
        )}
        {percentage !== undefined && (
          <Badge variant='secondary' className='text-xs'>
            {percentage.toFixed(1)}%
          </Badge>
        )}
      </div>
      <div className='text-2xl font-bold'>{value.toLocaleString()}</div>
      <div className='text-sm text-gray-600'>{label}</div>
    </div>
  );
}

function CategoryCard({
  icon: Icon,
  title,
  count,
  description,
  color,
  onClick,
}: {
  icon: any;
  title: string;
  count: number;
  description: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className='cursor-pointer'
    >
      <Card className='hover:shadow-lg transition-shadow'>
        <CardContent className='pt-6'>
          <div className='flex items-center justify-between mb-3'>
            <Icon className='w-6 h-6' style={{ color }} />
            <ChevronRight className='w-4 h-4 text-gray-400' />
          </div>
          <div className='text-3xl font-bold mb-1'>{count}</div>
          <div className='font-medium text-gray-900'>{title}</div>
          <div className='text-xs text-gray-600 mt-1'>{description}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function renderCustomLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
  const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

  return (
    <text
      x={x}
      y={y}
      fill='white'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline='central'
      className='text-xs font-medium'
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// Componentes das tabs (implementação simplificada)
function FollowersAnalysis({ analysis }: { analysis: CompleteAnalysis }) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Análise Detalhada de Seguidores</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <UserList
              title='Seguidores Recentes'
              users={analysis.basicData.followers.slice(0, 10)}
              showTimestamp
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CirclesAnalysis({
  analysis,
  selectedCategory,
  onCategoryChange,
}: {
  analysis: CompleteAnalysis;
  selectedCategory: keyof typeof analysis.relationships;
  onCategoryChange: (category: keyof typeof analysis.relationships) => void;
}) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Círculos Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          <UserList
            title={getCategoryTitle(selectedCategory)}
            users={analysis.relationships[selectedCategory] as InstagramUser[]}
            showTimestamp
          />
        </CardContent>
      </Card>
    </div>
  );
}

function PrivacyAnalysis({ analysis }: { analysis: CompleteAnalysis }) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Configurações de Privacidade</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 gap-4'>
            <StatCard
              icon={Ban}
              title='Bloqueados'
              value={analysis.stats.blockedCount}
              color={COLORS.danger}
            />
            <StatCard
              icon={Shield}
              title='Restritos'
              value={analysis.stats.restrictedCount}
              color={COLORS.warning}
            />
            <StatCard
              icon={EyeOff}
              title='Stories Ocultos'
              value={analysis.stats.hideStoryCount}
              color={COLORS.info}
            />
            <StatCard
              icon={Hash}
              title='Hashtags Seguidas'
              value={analysis.basicData.followingHashtags.length}
              color={COLORS.primary}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function TimelineAnalysis({ analysis }: { analysis: CompleteAnalysis }) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Timeline de Mudanças</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center text-gray-500 py-8'>
            <Clock className='w-12 h-12 mx-auto mb-4 opacity-50' />
            <p>
              Faça upload de uma nova análise para ver o histórico de mudanças
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InsightsAnalysis({ analysis }: { analysis: CompleteAnalysis }) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Insights e Tendências</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            <div className='grid grid-cols-2 gap-4'>
              <StatCard
                icon={TrendingUp}
                title='Taxa de Crescimento'
                value={`${analysis.insights.growthRate}%`}
                color={COLORS.success}
              />
              <StatCard
                icon={UserMinus}
                title='Taxa de Unfollow'
                value={analysis.insights.unfollowRate}
                color={COLORS.danger}
              />
            </div>

            {/* Lista todos os alertas */}
            <div className='space-y-2'>
              {analysis.socialHealth.alerts.map((alert, index) => (
                <AlertCard key={index} alert={alert} onClose={() => {}} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Componentes utilitários
function UserList({
  title,
  users,
  showTimestamp = false,
}: {
  title: string;
  users: InstagramUser[];
  showTimestamp?: boolean;
}) {
  if (users.length === 0) {
    return (
      <div className='text-center py-8 text-gray-500'>
        <UserX className='w-12 h-12 mx-auto mb-4 opacity-50' />
        <p>Nenhum usuário encontrado nesta categoria</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className='font-medium mb-4'>{title}</h3>
      <div className='space-y-2 max-h-96 overflow-y-auto'>
        {users.map((user, index) => (
          <div
            key={index}
            className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
          >
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                <span className='text-white text-sm font-bold'>
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className='font-medium'>@{user.username}</p>
                {showTimestamp && user.timestamp && (
                  <p className='text-xs text-gray-500'>
                    {new Date(user.timestamp * 1000).toLocaleDateString(
                      'pt-BR'
                    )}
                  </p>
                )}
              </div>
            </div>
            {user.href && (
              <Button
                variant='ghost'
                size='sm'
                onClick={() => window.open(user.href, '_blank')}
              >
                Ver Perfil
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  color,
}: {
  icon: any;
  title: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className='p-4 bg-gray-50 rounded-lg'>
      <Icon className='w-6 h-6 mb-2' style={{ color }} />
      <div className='text-2xl font-bold'>{value}</div>
      <div className='text-sm text-gray-600'>{title}</div>
    </div>
  );
}

function getCategoryTitle(category: string): string {
  const titles: Record<string, string> = {
    mutual: 'Seguidores Mútuos',
    notFollowingBack: 'Não Te Seguem de Volta',
    notFollowedBack: 'Você Não Segue de Volta',
    vips: 'VIPs (Mútuos + Close Friends)',
    redFlags: 'Red Flags (Close Friends que não te seguem)',
    fans: 'Seus Fãs (Te seguem mas você não segue)',
    crushes: 'Seus Crushes (Você segue mas não te seguem)',
    ghosts: 'Ghosts (Unfollows Recentes)',
    stalkers: 'Stalkers (Solicitações Pendentes)',
    suspicious: 'Suspeitos (Possíveis Bloqueios)',
  };
  return titles[category] || category;
}
