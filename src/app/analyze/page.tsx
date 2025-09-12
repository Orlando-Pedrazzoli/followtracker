'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  UserMinus,
  UserCheck,
  TrendingUp,
  Download,
  Search,
  Filter,
  MoreHorizontal,
  ArrowLeft,
  Share2,
  BarChart3,
  Trash2,
  Save,
  ArrowDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/ui/header';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

interface User {
  username: string;
  timestamp?: number;
  href?: string;
}

interface AnalysisData {
  followers: User[];
  following: User[];
  mutual: User[];
  notFollowingBack: User[];
  notFollowedBack: User[];
  stats: {
    totalFollowers: number;
    totalFollowing: number;
    mutualCount: number;
    notFollowingBackCount: number;
    notFollowedBackCount: number;
    engagementRatio: number;
  };
  analyzedAt?: string;
}

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

export default function AnalyzePage() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const router = useRouter();

  useEffect(() => {
    const loadData = () => {
      try {
        // Primeiro, tenta carregar análise salva
        const savedAnalysis = localStorage.getItem('instagram-analysis');
        if (savedAnalysis) {
          const analysisData = JSON.parse(savedAnalysis);
          setData(analysisData);
          setIsLoading(false);
          toast.success('Análise carregada do histórico!');
          return;
        }

        // Se não houver análise salva, tenta processar dados novos
        const savedData = localStorage.getItem('instagram-data');
        if (!savedData) {
          toast.error(
            'Dados não encontrados. Faça upload dos arquivos primeiro.'
          );
          router.push('/upload');
          return;
        }

        const parsedData = JSON.parse(savedData);
        const analysisResult = analyzeData(
          parsedData.followers,
          parsedData.following
        );

        // Salva a análise no localStorage
        const analysisWithDate = {
          ...analysisResult,
          analyzedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          'instagram-analysis',
          JSON.stringify(analysisWithDate)
        );

        setData(analysisWithDate);
        setIsLoading(false);
        toast.success('Análise concluída e salva com sucesso!');
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast.error('Erro ao carregar dados');
        router.push('/upload');
      }
    };

    loadData();
  }, [router]);

  const analyzeData = (followers: any[], following: any[]): AnalysisData => {
    // Normalizar dados do formato Instagram
    const normalizeUsers = (users: any[]): User[] => {
      return users.map(user => {
        // Formato do Instagram: objeto com string_list_data
        if (user.string_list_data && user.string_list_data.length > 0) {
          const userData = user.string_list_data[0];
          return {
            username: userData.value,
            timestamp: userData.timestamp,
            href: userData.href,
          };
        }
        // Formato alternativo: array direto de strings
        if (typeof user === 'string') {
          return { username: user };
        }
        // Formato alternativo: objeto com username
        if (user.username) {
          return {
            username: user.username,
            timestamp: user.timestamp,
            href: user.href,
          };
        }
        // Formato alternativo: objeto com value
        if (user.value) {
          return {
            username: user.value,
            timestamp: user.timestamp,
            href: user.href,
          };
        }
        // Fallback
        return { username: user.name || user.toString() || 'unknown' };
      });
    };

    const followersList = normalizeUsers(followers);
    const followingList = normalizeUsers(following);

    // Criar sets para comparação eficiente
    const followersSet = new Set(followersList.map(u => u.username));
    const followingSet = new Set(followingList.map(u => u.username));

    // Análises
    const mutual = followersList.filter(user =>
      followingSet.has(user.username)
    );
    const notFollowingBack = followingList.filter(
      user => !followersSet.has(user.username)
    );
    const notFollowedBack = followersList.filter(
      user => !followingSet.has(user.username)
    );

    const stats = {
      totalFollowers: followersList.length,
      totalFollowing: followingList.length,
      mutualCount: mutual.length,
      notFollowingBackCount: notFollowingBack.length,
      notFollowedBackCount: notFollowedBack.length,
      engagementRatio:
        followersList.length > 0
          ? (mutual.length / followersList.length) * 100
          : 0,
    };

    return {
      followers: followersList,
      following: followingList,
      mutual,
      notFollowingBack,
      notFollowedBack,
      stats,
    };
  };

  const clearAnalysis = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados salvos?')) {
      localStorage.removeItem('instagram-analysis');
      localStorage.removeItem('instagram-data');
      toast.success('Dados limpos com sucesso!');
      router.push('/upload');
    }
  };

  const saveAnalysis = () => {
    if (data) {
      const analysisWithDate = {
        ...data,
        analyzedAt: new Date().toISOString(),
      };
      localStorage.setItem(
        'instagram-analysis',
        JSON.stringify(analysisWithDate)
      );
      setData(analysisWithDate);
      toast.success('Análise salva com sucesso!');
    }
  };

  const exportData = (type: 'csv' | 'json', users: User[]) => {
    const filename = `instagram-${
      type === 'csv' ? 'export.csv' : 'export.json'
    }`;

    if (type === 'csv') {
      const csvContent = [
        'Username,Timestamp,Profile URL',
        ...users.map(
          user =>
            `${user.username},${
              user.timestamp
                ? new Date(user.timestamp * 1000).toISOString()
                : ''
            },${user.href || ''}`
        ),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const jsonContent = JSON.stringify(users, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }

    toast.success(`Arquivo ${filename} baixado com sucesso!`);
  };

  const shareStats = async () => {
    if (navigator.share && data) {
      try {
        await navigator.share({
          title: 'Minha análise do Instagram',
          text: `📊 Minha análise do Instagram:\n• ${data.stats.totalFollowers} seguidores\n• ${data.stats.totalFollowing} seguindo\n• ${data.stats.mutualCount} mútuos\n• ${data.stats.notFollowingBackCount} não me seguem de volta`,
          url: window.location.origin,
        });
      } catch (error) {
        // Fallback para copy to clipboard
        const text = `📊 Minha análise do Instagram:\n• ${data.stats.totalFollowers} seguidores\n• ${data.stats.totalFollowing} seguindo\n• ${data.stats.mutualCount} mútuos\n• ${data.stats.notFollowingBackCount} não me seguem de volta`;
        navigator.clipboard.writeText(text);
        toast.success('Estatísticas copiadas para a área de transferência!');
      }
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen gradient-bg flex items-center justify-center'>
        <div className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className='w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4'
          />
          <p className='text-white text-lg'>Analisando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className='min-h-screen gradient-bg flex items-center justify-center'>
        <div className='text-center'>
          <p className='text-white text-lg'>Erro ao carregar dados</p>
          <Button onClick={() => router.push('/upload')} className='mt-4'>
            Voltar ao Upload
          </Button>
        </div>
      </div>
    );
  }

  const pieData = [
    { name: 'Mútuos', value: data.stats.mutualCount, color: COLORS[2] },
    {
      name: 'Não me seguem',
      value: data.stats.notFollowingBackCount,
      color: COLORS[1],
    },
    {
      name: 'Eu não sigo',
      value: data.stats.notFollowedBackCount,
      color: COLORS[3],
    },
  ];

  const filteredUsers = (users: User[]) => {
    return users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleCardClick = (tabValue: string) => {
    setSelectedTab(tabValue);
    // Aguarda um momento para a tab mudar antes de fazer o scroll
    setTimeout(() => {
      const element = document.getElementById('detailed-analysis');
      if (element) {
        const yOffset = -80; // Offset para compensar o header fixo
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className='min-h-screen gradient-bg'>
      <Header
        subtitle='Análise dos seguidores'
        rightContent={
          <>
            <Button
              variant='ghost'
              onClick={saveAnalysis}
              className='text-white hover:bg-white/20'
              title='Salvar análise'
            >
              <Save className='w-4 h-4 mr-2' />
              Salvar
            </Button>
            <Button
              variant='ghost'
              onClick={shareStats}
              className='text-white hover:bg-white/20'
            >
              <Share2 className='w-4 h-4 mr-2' />
              Compartilhar
            </Button>
            <Button
              variant='ghost'
              onClick={clearAnalysis}
              className='text-white hover:bg-white/20'
              title='Limpar todos os dados'
            >
              <Trash2 className='w-4 h-4 mr-2' />
              Limpar
            </Button>
            <Button
              variant='ghost'
              onClick={() => router.push('/upload')}
              className='text-white hover:bg-white/20'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Nova Análise
            </Button>
          </>
        }
      />

      <main className='container mx-auto px-4 py-8'>
        {/* Data de análise */}
        {data.analyzedAt && (
          <div className='text-center mb-4'>
            <Badge variant='secondary' className='bg-white/20 text-white'>
              Análise salva em:{' '}
              {new Date(data.analyzedAt).toLocaleString('pt-BR')}
            </Badge>
          </div>
        )}

        {/* Stats Overview */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => handleCardClick('overview')}
            className='cursor-pointer transform transition-transform hover:scale-105 group'
            title='Clique para ver detalhes'
          >
            <Card className='hover:shadow-xl transition-shadow relative overflow-hidden'>
              <div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='bg-blue-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1'>
                  Ver todos <ArrowDown className='w-3 h-3' />
                </div>
              </div>
              <CardContent className='p-6'>
                <div className='flex items-center'>
                  <UserCheck className='h-8 w-8 text-blue-500' />
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Seguidores
                    </p>
                    <p className='text-2xl font-bold'>
                      {data.stats.totalFollowers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleCardClick('overview')}
            className='cursor-pointer transform transition-transform hover:scale-105 group'
            title='Clique para ver detalhes'
          >
            <Card className='hover:shadow-xl transition-shadow relative overflow-hidden'>
              <div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='bg-purple-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1'>
                  Ver todos <ArrowDown className='w-3 h-3' />
                </div>
              </div>
              <CardContent className='p-6'>
                <div className='flex items-center'>
                  <UserCheck className='h-8 w-8 text-purple-500' />
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Seguindo
                    </p>
                    <p className='text-2xl font-bold'>
                      {data.stats.totalFollowing.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => handleCardClick('mutual')}
            className='cursor-pointer transform transition-transform hover:scale-105 group'
            title='Clique para ver lista de mútuos'
          >
            <Card className='hover:shadow-xl transition-shadow relative overflow-hidden'>
              <div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1'>
                  Ver lista <ArrowDown className='w-3 h-3' />
                </div>
              </div>
              <CardContent className='p-6'>
                <div className='flex items-center'>
                  <UserCheck className='h-8 w-8 text-green-500' />
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Mútuos
                    </p>
                    <p className='text-2xl font-bold'>
                      {data.stats.mutualCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => handleCardClick('not-following')}
            className='cursor-pointer transform transition-transform hover:scale-105 group'
            title='Clique para ver quem não te segue'
          >
            <Card className='hover:shadow-xl transition-shadow relative overflow-hidden'>
              <div className='absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg flex items-center gap-1'>
                  Ver lista <ArrowDown className='w-3 h-3' />
                </div>
              </div>
              <CardContent className='p-6'>
                <div className='flex items-center'>
                  <UserMinus className='h-8 w-8 text-red-500' />
                  <div className='ml-4'>
                    <p className='text-sm font-medium text-muted-foreground'>
                      Não seguem
                    </p>
                    <p className='text-2xl font-bold'>
                      {data.stats.notFollowingBackCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className='grid md:grid-cols-2 gap-8 mb-8'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center'>
                <BarChart3 className='w-5 h-5 mr-2' />
                Distribuição dos Seguidores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width='100%' height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
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

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='flex justify-between items-center p-3 bg-blue-50 rounded-lg'>
                  <span className='font-medium'>Taxa de Engajamento</span>
                  <Badge variant='secondary'>
                    {data.stats.engagementRatio.toFixed(1)}%
                  </Badge>
                </div>

                <div className='flex justify-between items-center p-3 bg-green-50 rounded-lg'>
                  <span className='font-medium'>Ratio Seguidor/Seguindo</span>
                  <Badge variant='secondary'>
                    {(
                      data.stats.totalFollowers /
                      Math.max(data.stats.totalFollowing, 1)
                    ).toFixed(2)}
                  </Badge>
                </div>

                <div className='flex justify-between items-center p-3 bg-purple-50 rounded-lg'>
                  <span className='font-medium'>Conexões Mútuas</span>
                  <Badge variant='secondary'>
                    {(
                      (data.stats.mutualCount / data.stats.totalFollowers) *
                      100
                    ).toFixed(1)}
                    %
                  </Badge>
                </div>

                <div className='pt-4'>
                  <h4 className='font-semibold mb-2'>💡 Sugestões:</h4>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    {data.stats.notFollowingBackCount > 50 && (
                      <li>
                        • Considere deixar de seguir alguns usuários que não te
                        seguem
                      </li>
                    )}
                    {data.stats.engagementRatio < 30 && (
                      <li>
                        • Foque em engajamento para aumentar seguidores mútuos
                      </li>
                    )}
                    {data.stats.totalFollowing >
                      data.stats.totalFollowers * 2 && (
                      <li>• Você está seguindo muito mais do que te seguem</li>
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Card id='detailed-analysis' className='scroll-mt-20'>
          <CardHeader>
            <div className='flex justify-between items-center'>
              <CardTitle>Análise Detalhada</CardTitle>
              <div className='flex items-center space-x-2'>
                <Input
                  placeholder='Buscar usuário...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className='w-64'
                />
                <Button variant='outline' size='sm'>
                  <Filter className='w-4 h-4' />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              value={selectedTab}
              onValueChange={setSelectedTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='overview'>Visão Geral</TabsTrigger>
                <TabsTrigger value='not-following'>Não Me Seguem</TabsTrigger>
                <TabsTrigger value='mutual'>Mútuos</TabsTrigger>
                <TabsTrigger value='not-followed'>Não Sigo</TabsTrigger>
              </TabsList>

              <TabsContent value='overview' className='space-y-4'>
                <div className='grid md:grid-cols-3 gap-4'>
                  <StatCard
                    title='Não me seguem de volta'
                    count={data.stats.notFollowingBackCount}
                    color='text-red-600'
                    bgColor='bg-red-50'
                    onExport={() => exportData('csv', data.notFollowingBack)}
                  />
                  <StatCard
                    title='Seguidores mútuos'
                    count={data.stats.mutualCount}
                    color='text-green-600'
                    bgColor='bg-green-50'
                    onExport={() => exportData('csv', data.mutual)}
                  />
                  <StatCard
                    title='Eu não sigo de volta'
                    count={data.stats.notFollowedBackCount}
                    color='text-orange-600'
                    bgColor='bg-orange-50'
                    onExport={() => exportData('csv', data.notFollowedBack)}
                  />
                </div>
              </TabsContent>

              <TabsContent value='not-following'>
                <UserList
                  title='Usuários que você segue mas não te seguem de volta'
                  users={filteredUsers(data.notFollowingBack)}
                  emptyMessage='Nenhum usuário encontrado'
                  actionButton={user => (
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-red-600 hover:text-red-700'
                      onClick={() => {
                        if (user.href) {
                          window.open(user.href, '_blank');
                        }
                      }}
                    >
                      Ver Perfil
                    </Button>
                  )}
                />
              </TabsContent>

              <TabsContent value='mutual'>
                <UserList
                  title='Seguidores mútuos'
                  users={filteredUsers(data.mutual)}
                  emptyMessage='Nenhum seguidor mútuo encontrado'
                />
              </TabsContent>

              <TabsContent value='not-followed'>
                <UserList
                  title='Seguidores que você não segue de volta'
                  users={filteredUsers(data.notFollowedBack)}
                  emptyMessage='Nenhum usuário encontrado'
                  actionButton={user => (
                    <Button
                      variant='outline'
                      size='sm'
                      className='text-blue-600 hover:text-blue-700'
                      onClick={() => {
                        if (user.href) {
                          window.open(user.href, '_blank');
                        }
                      }}
                    >
                      Ver Perfil
                    </Button>
                  )}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function StatCard({
  title,
  count,
  color,
  bgColor,
  onExport,
}: {
  title: string;
  count: number;
  color: string;
  bgColor: string;
  onExport?: () => void;
}) {
  return (
    <div className={`p-4 ${bgColor} rounded-lg`}>
      <div className='flex justify-between items-center mb-2'>
        <h3 className='font-medium text-gray-700'>{title}</h3>
        {onExport && (
          <Button variant='ghost' size='sm' onClick={onExport}>
            <Download className='w-4 h-4' />
          </Button>
        )}
      </div>
      <p className={`text-2xl font-bold ${color}`}>{count.toLocaleString()}</p>
    </div>
  );
}

function UserList({
  title,
  users,
  emptyMessage,
  actionButton,
}: {
  title: string;
  users: User[];
  emptyMessage: string;
  actionButton?: (user: User) => React.ReactNode;
}) {
  return (
    <div>
      <div className='flex justify-between items-center mb-4'>
        <h3 className='text-lg font-semibold'>{title}</h3>
        <Badge variant='secondary'>{users.length} usuários</Badge>
      </div>

      {users.length === 0 ? (
        <p className='text-center text-gray-500 py-8'>{emptyMessage}</p>
      ) : (
        <div className='space-y-2 max-h-[600px] overflow-y-auto'>
          {users.map((user, index) => (
            <motion.div
              key={user.username}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(index * 0.01, 0.3) }}
              className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors'
            >
              <div className='flex items-center space-x-3'>
                <div className='w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                  <span className='text-white text-sm font-bold'>
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className='font-medium'>@{user.username}</p>
                  {user.timestamp && (
                    <p className='text-xs text-gray-500'>
                      {new Date(user.timestamp * 1000).toLocaleDateString(
                        'pt-BR'
                      )}
                    </p>
                  )}
                </div>
              </div>
              {actionButton && actionButton(user)}
            </motion.div>
          ))}
          {users.length > 50 && (
            <p className='text-center text-gray-500 text-sm py-2 font-semibold'>
              Total: {users.length} usuários
            </p>
          )}
        </div>
      )}
    </div>
  );
}
