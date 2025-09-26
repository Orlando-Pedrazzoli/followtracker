'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CompleteAnalysis } from '@/types/instagram';
import { InstagramAnalyzer, HistoryManager } from '@/lib/instagram-parser';
import toast from 'react-hot-toast';

export default function AnalyzePage() {
  const [analysis, setAnalysis] = useState<CompleteAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('not-following-back');
  const [showAllNotFollowing, setShowAllNotFollowing] = useState(false);
  const [showAllMutual, setShowAllMutual] = useState(false);
  const [showAllNotFollowed, setShowAllNotFollowed] = useState(false);
  const router = useRouter();

  // Quantidade inicial de itens a mostrar
  const INITIAL_ITEMS_TO_SHOW = 50;
  const ITEMS_INCREMENT = 50; // Quantos itens adicionar a cada "Mostrar mais"

  // Estados para controlar quantos itens mostrar
  const [notFollowingItemsToShow, setNotFollowingItemsToShow] = useState(
    INITIAL_ITEMS_TO_SHOW
  );
  const [mutualItemsToShow, setMutualItemsToShow] = useState(
    INITIAL_ITEMS_TO_SHOW
  );
  const [notFollowedItemsToShow, setNotFollowedItemsToShow] = useState(
    INITIAL_ITEMS_TO_SHOW
  );

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

        // Comparar com análise anterior para detectar bloqueios
        const comparison = HistoryManager.compareWithPrevious(analysisData);
        if (comparison && comparison.changes.possibleBlocks.length > 0) {
          analysisData.relationships.suspicious =
            comparison.changes.possibleBlocks;
          setAnalysis({ ...analysisData });

          toast.error(
            `⚠️ ${comparison.changes.possibleBlocks.length} possíveis bloqueios detectados!`,
            { duration: 5000 }
          );
        }

        // Alerta principal
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

  const exportToCSV = (data: any[], filename: string) => {
    const csv = data
      .map(
        user =>
          `${user.username},${
            user.href || `https://instagram.com/${user.username}`
          }`
      )
      .join('\n');
    const blob = new Blob([`Username,Profile Link\n${csv}`], {
      type: 'text/csv',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Lista exportada com sucesso!');
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
        await navigator.share({
          title: 'Análise do Instagram',
          text: text,
        });
      } catch (error) {
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

  // Função para mostrar mais itens
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

  // Função para mostrar todos os itens
  const handleShowAll = (type: 'notFollowing' | 'mutual' | 'notFollowed') => {
    if (!analysis) return;

    switch (type) {
      case 'notFollowing':
        setNotFollowingItemsToShow(
          analysis.relationships.notFollowingBack.length
        );
        setShowAllNotFollowing(true);
        break;
      case 'mutual':
        setMutualItemsToShow(analysis.relationships.mutual.length);
        setShowAllMutual(true);
        break;
      case 'notFollowed':
        setNotFollowedItemsToShow(
          analysis.relationships.notFollowedBack.length
        );
        setShowAllNotFollowed(true);
        break;
    }
  };

  // Função para mostrar menos itens
  const handleShowLess = (type: 'notFollowing' | 'mutual' | 'notFollowed') => {
    switch (type) {
      case 'notFollowing':
        setNotFollowingItemsToShow(INITIAL_ITEMS_TO_SHOW);
        setShowAllNotFollowing(false);
        break;
      case 'mutual':
        setMutualItemsToShow(INITIAL_ITEMS_TO_SHOW);
        setShowAllMutual(false);
        break;
      case 'notFollowed':
        setNotFollowedItemsToShow(INITIAL_ITEMS_TO_SHOW);
        setShowAllNotFollowed(false);
        break;
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
          <p className='text-white text-lg'>Carregando análise...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className='min-h-screen gradient-bg flex flex-col'>
        <Header subtitle='Análise de Seguidores' />
        <main className='container mx-auto px-4 py-16 flex-1'>
          <div className='text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-8'
            >
              <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6'>
                <BarChart3 className='w-10 h-10 text-white' />
              </div>
              <h2 className='text-white text-3xl font-bold mb-4'>
                Nenhuma análise encontrada
              </h2>
              <p className='text-white text-lg opacity-90 max-w-md mx-auto'>
                Faça upload dos seus arquivos do Instagram para descobrir quem
                não te segue de volta.
              </p>
            </motion.div>
            <Button
              onClick={() => router.push('/upload')}
              className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
              size='lg'
            >
              <Upload className='w-5 h-5 mr-2' />
              Fazer Upload
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen gradient-bg flex flex-col'>
      <Header
        subtitle={`${analysis.stats.notFollowingBackCount} não te seguem de volta`}
        rightContent={
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              onClick={handleShare}
              className='btn-header'
              title='Compartilhar'
            >
              <Share2 className='w-4 h-4 md:mr-2' />
              <span className='hidden md:inline'>Compartilhar</span>
            </Button>
            <Button
              variant='ghost'
              onClick={clearAnalysis}
              className='btn-header'
              title='Limpar dados'
            >
              <Trash2 className='w-4 h-4 md:mr-2' />
              <span className='hidden md:inline'>Limpar</span>
            </Button>
            <Button
              variant='ghost'
              onClick={() => router.push('/upload')}
              className='btn-header'
            >
              <RefreshCw className='w-4 h-4 md:mr-2' />
              <span className='hidden md:inline'>Nova</span>
            </Button>
          </div>
        }
      />

      <main className='container mx-auto px-4 py-8 flex-1'>
        {/* Alertas Principais */}
        {analysis.stats.notFollowingBackCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-6'
          >
            <Card className='border-red-300 bg-red-50'>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-4'>
                  <AlertTriangle className='w-12 h-12 text-red-500 flex-shrink-0' />
                  <div>
                    <h3 className='text-xl font-bold text-red-800'>
                      {analysis.stats.notFollowingBackCount} pessoas não te
                      seguem de volta!
                    </h3>
                    <p className='text-red-700'>
                      Você segue essas pessoas mas elas não te seguem. Considere
                      deixar de segui-las.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {analysis.relationships.suspicious.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-6'
          >
            <Card className='border-yellow-300 bg-yellow-50'>
              <CardContent className='pt-6'>
                <div className='flex items-center gap-4'>
                  <Ban className='w-12 h-12 text-yellow-600 flex-shrink-0' />
                  <div>
                    <h3 className='text-xl font-bold text-yellow-800'>
                      {analysis.relationships.suspicious.length} possíveis
                      bloqueios detectados
                    </h3>
                    <p className='text-yellow-700'>
                      Esses perfis sumiram sem aparecer nos unfollows recentes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Estatísticas */}
        <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mb-8'>
          <Card className='border-gray-200'>
            <CardContent className='pt-6 text-center'>
              <Users className='w-8 h-8 mx-auto mb-2 text-blue-500' />
              <div className='text-2xl font-bold'>
                {analysis.stats.totalFollowers}
              </div>
              <div className='text-sm text-gray-600'>Seguidores</div>
            </CardContent>
          </Card>

          <Card className='border-gray-200'>
            <CardContent className='pt-6 text-center'>
              <UserCheck className='w-8 h-8 mx-auto mb-2 text-purple-500' />
              <div className='text-2xl font-bold'>
                {analysis.stats.totalFollowing}
              </div>
              <div className='text-sm text-gray-600'>Seguindo</div>
            </CardContent>
          </Card>

          <Card className='border-red-300 bg-red-50'>
            <CardContent className='pt-6 text-center'>
              <UserMinus className='w-8 h-8 mx-auto mb-2 text-red-500' />
              <div className='text-2xl font-bold text-red-600'>
                {analysis.stats.notFollowingBackCount}
              </div>
              <div className='text-sm text-red-600 font-semibold'>
                Não te seguem
              </div>
            </CardContent>
          </Card>

          <Card className='border-green-300 bg-green-50'>
            <CardContent className='pt-6 text-center'>
              <Heart className='w-8 h-8 mx-auto mb-2 text-green-500' />
              <div className='text-2xl font-bold text-green-600'>
                {analysis.stats.mutualCount}
              </div>
              <div className='text-sm text-green-600'>Mútuos</div>
            </CardContent>
          </Card>

          <Card className='border-purple-300 bg-purple-50'>
            <CardContent className='pt-6 text-center'>
              <BarChart3 className='w-8 h-8 mx-auto mb-2 text-purple-500' />
              <div className='text-2xl font-bold text-purple-600'>
                {analysis.stats.engagementRatio.toFixed(1)}%
              </div>
              <div className='text-sm text-purple-600'>Engajamento</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs de Análise */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className='grid w-full grid-cols-5'>
              <TabsTrigger
                value='not-following-back'
                className='text-xs md:text-sm'
              >
                <UserMinus className='w-4 h-4 mr-1' />
                Não Seguem ({analysis.stats.notFollowingBackCount})
              </TabsTrigger>
              <TabsTrigger value='suspicious' className='text-xs md:text-sm'>
                <Ban className='w-4 h-4 mr-1' />
                Bloqueios ({analysis.relationships.suspicious.length})
              </TabsTrigger>
              <TabsTrigger value='mutual' className='text-xs md:text-sm'>
                <Heart className='w-4 h-4 mr-1' />
                Mútuos ({analysis.stats.mutualCount})
              </TabsTrigger>
              <TabsTrigger value='not-followed' className='text-xs md:text-sm'>
                <Users className='w-4 h-4 mr-1' />
                Não Seguidos ({analysis.stats.notFollowedBackCount})
              </TabsTrigger>
              <TabsTrigger value='ghosts' className='text-xs md:text-sm'>
                <Ghost className='w-4 h-4 mr-1' />
                Unfollows ({analysis.relationships.ghosts.length})
              </TabsTrigger>
            </TabsList>

            {/* Tab: Não Te Seguem de Volta (PRINCIPAL) */}
            <TabsContent value='not-following-back'>
              <CardHeader>
                <CardTitle className='text-red-600'>
                  Pessoas que você segue mas não te seguem de volta
                </CardTitle>
                <div className='flex items-center justify-between mt-2'>
                  <p className='text-gray-600'>
                    Total: {analysis.stats.notFollowingBackCount} pessoas
                  </p>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>
                      Mostrando{' '}
                      {Math.min(
                        notFollowingItemsToShow,
                        analysis.relationships.notFollowingBack.length
                      )}{' '}
                      de {analysis.relationships.notFollowingBack.length}
                    </Badge>
                    <Button
                      onClick={() =>
                        exportToCSV(
                          analysis.relationships.notFollowingBack,
                          'nao_te_seguem_de_volta.csv'
                        )
                      }
                      size='sm'
                      variant='outline'
                    >
                      <Download className='w-4 h-4 mr-2' />
                      Exportar Tudo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {analysis.relationships.notFollowingBack
                    .slice(0, notFollowingItemsToShow)
                    .map((user, index) => (
                      <div
                        key={index}
                        className='bg-red-50 border border-red-200 rounded-lg p-3 hover:shadow-md transition-shadow'
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <div className='font-semibold text-gray-800'>
                              @{user.username}
                            </div>
                            {user.timestamp && (
                              <div className='text-xs text-gray-500'>
                                Seguindo há{' '}
                                {Math.floor(
                                  (Date.now() / 1000 - user.timestamp) / 86400
                                )}{' '}
                                dias
                              </div>
                            )}
                          </div>
                          <a
                            href={
                              user.href ||
                              `https://instagram.com/${user.username}`
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-red-500 hover:text-red-600 font-medium'
                          >
                            Ver →
                          </a>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Botões de controle de visualização */}
                {analysis.relationships.notFollowingBack.length >
                  INITIAL_ITEMS_TO_SHOW && (
                  <div className='flex justify-center gap-4 mt-6'>
                    {notFollowingItemsToShow <
                      analysis.relationships.notFollowingBack.length && (
                      <>
                        <Button
                          onClick={() => handleShowMore('notFollowing')}
                          variant='outline'
                        >
                          <ChevronDown className='w-4 h-4 mr-2' />
                          Mostrar mais {ITEMS_INCREMENT}
                        </Button>
                        <Button
                          onClick={() => handleShowAll('notFollowing')}
                          className='bg-red-500 hover:bg-red-600'
                        >
                          <Eye className='w-4 h-4 mr-2' />
                          Mostrar todos (
                          {analysis.relationships.notFollowingBack.length})
                        </Button>
                      </>
                    )}
                    {notFollowingItemsToShow > INITIAL_ITEMS_TO_SHOW && (
                      <Button
                        onClick={() => handleShowLess('notFollowing')}
                        variant='outline'
                      >
                        <ChevronUp className='w-4 h-4 mr-2' />
                        Mostrar menos
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Tab: Possíveis Bloqueios */}
            <TabsContent value='suspicious'>
              <CardHeader>
                <CardTitle className='text-yellow-600'>
                  Possíveis Bloqueios (Beta)
                </CardTitle>
                <p className='text-gray-600'>
                  Perfis que sumiram sem aparecer nos unfollows
                </p>
              </CardHeader>
              <CardContent>
                {analysis.relationships.suspicious.length === 0 ? (
                  <div className='text-center py-8'>
                    <Ban className='w-12 h-12 mx-auto text-gray-300 mb-4' />
                    <p className='text-gray-500'>
                      Nenhum bloqueio suspeito detectado
                    </p>
                  </div>
                ) : (
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {analysis.relationships.suspicious.map((user, index) => (
                      <div
                        key={index}
                        className='bg-yellow-50 border border-yellow-200 rounded-lg p-3'
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <div className='font-semibold text-gray-800'>
                              @{user.username}
                            </div>
                            <div className='text-xs text-yellow-700'>
                              Possível bloqueio
                            </div>
                          </div>
                          <a
                            href={
                              user.href ||
                              `https://instagram.com/${user.username}`
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-yellow-600 hover:text-yellow-700 font-medium'
                          >
                            Verificar →
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Tab: Mútuos */}
            <TabsContent value='mutual'>
              <CardHeader>
                <CardTitle className='text-green-600'>
                  Seguidores Mútuos
                </CardTitle>
                <div className='flex items-center justify-between mt-2'>
                  <p className='text-gray-600'>
                    Pessoas que vocês se seguem mutuamente
                  </p>
                  <div className='flex gap-2'>
                    <Badge variant='secondary'>
                      Mostrando{' '}
                      {Math.min(
                        mutualItemsToShow,
                        analysis.relationships.mutual.length
                      )}{' '}
                      de {analysis.relationships.mutual.length}
                    </Badge>
                    <Button
                      onClick={() =>
                        exportToCSV(
                          analysis.relationships.mutual,
                          'seguidores_mutuos.csv'
                        )
                      }
                      size='sm'
                      variant='outline'
                    >
                      <Download className='w-4 h-4 mr-2' />
                      Exportar Tudo
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {analysis.relationships.mutual
                    .slice(0, mutualItemsToShow)
                    .map((user, index) => (
                      <div
                        key={index}
                        className='bg-green-50 border border-green-200 rounded-lg p-3'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='font-semibold text-gray-800'>
                            @{user.username} ✅
                          </div>
                          <a
                            href={
                              user.href ||
                              `https://instagram.com/${user.username}`
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-green-500 hover:text-green-600 font-medium'
                          >
                            Ver →
                          </a>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Botões de controle de visualização */}
                {analysis.relationships.mutual.length >
                  INITIAL_ITEMS_TO_SHOW && (
                  <div className='flex justify-center gap-4 mt-6'>
                    {mutualItemsToShow <
                      analysis.relationships.mutual.length && (
                      <>
                        <Button
                          onClick={() => handleShowMore('mutual')}
                          variant='outline'
                        >
                          <ChevronDown className='w-4 h-4 mr-2' />
                          Mostrar mais {ITEMS_INCREMENT}
                        </Button>
                        <Button
                          onClick={() => handleShowAll('mutual')}
                          className='bg-green-500 hover:bg-green-600'
                        >
                          <Eye className='w-4 h-4 mr-2' />
                          Mostrar todos ({analysis.relationships.mutual.length})
                        </Button>
                      </>
                    )}
                    {mutualItemsToShow > INITIAL_ITEMS_TO_SHOW && (
                      <Button
                        onClick={() => handleShowLess('mutual')}
                        variant='outline'
                      >
                        <ChevronUp className='w-4 h-4 mr-2' />
                        Mostrar menos
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Tab: Não Seguidos */}
            <TabsContent value='not-followed'>
              <CardHeader>
                <CardTitle>Pessoas que te seguem mas você não segue</CardTitle>
                <div className='flex items-center justify-between mt-2'>
                  <p className='text-gray-600'>
                    Potenciais seguidores para seguir de volta
                  </p>
                  <Badge variant='secondary'>
                    Mostrando{' '}
                    {Math.min(
                      notFollowedItemsToShow,
                      analysis.relationships.notFollowedBack.length
                    )}{' '}
                    de {analysis.relationships.notFollowedBack.length}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                  {analysis.relationships.notFollowedBack
                    .slice(0, notFollowedItemsToShow)
                    .map((user, index) => (
                      <div
                        key={index}
                        className='bg-blue-50 border border-blue-200 rounded-lg p-3'
                      >
                        <div className='flex items-center justify-between'>
                          <div className='font-semibold text-gray-800'>
                            @{user.username}
                          </div>
                          <a
                            href={
                              user.href ||
                              `https://instagram.com/${user.username}`
                            }
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-blue-500 hover:text-blue-600 font-medium'
                          >
                            Seguir →
                          </a>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Botões de controle de visualização */}
                {analysis.relationships.notFollowedBack.length >
                  INITIAL_ITEMS_TO_SHOW && (
                  <div className='flex justify-center gap-4 mt-6'>
                    {notFollowedItemsToShow <
                      analysis.relationships.notFollowedBack.length && (
                      <>
                        <Button
                          onClick={() => handleShowMore('notFollowed')}
                          variant='outline'
                        >
                          <ChevronDown className='w-4 h-4 mr-2' />
                          Mostrar mais {ITEMS_INCREMENT}
                        </Button>
                        <Button
                          onClick={() => handleShowAll('notFollowed')}
                          className='bg-blue-500 hover:bg-blue-600'
                        >
                          <Eye className='w-4 h-4 mr-2' />
                          Mostrar todos (
                          {analysis.relationships.notFollowedBack.length})
                        </Button>
                      </>
                    )}
                    {notFollowedItemsToShow > INITIAL_ITEMS_TO_SHOW && (
                      <Button
                        onClick={() => handleShowLess('notFollowed')}
                        variant='outline'
                      >
                        <ChevronUp className='w-4 h-4 mr-2' />
                        Mostrar menos
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </TabsContent>

            {/* Tab: Ghosts (Unfollows) */}
            <TabsContent value='ghosts'>
              <CardHeader>
                <CardTitle>Unfollows Recentes</CardTitle>
                <p className='text-gray-600'>
                  Pessoas que você deixou de seguir recentemente
                </p>
              </CardHeader>
              <CardContent>
                {analysis.relationships.ghosts.length === 0 ? (
                  <div className='text-center py-8'>
                    <Ghost className='w-12 h-12 mx-auto text-gray-300 mb-4' />
                    <p className='text-gray-500'>Nenhum unfollow recente</p>
                  </div>
                ) : (
                  <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-3'>
                    {analysis.relationships.ghosts.map((user, index) => (
                      <div
                        key={index}
                        className='bg-purple-50 border border-purple-200 rounded-lg p-3'
                      >
                        <div className='flex items-center justify-between'>
                          <div>
                            <div className='font-semibold text-gray-800'>
                              @{user.username}
                            </div>
                            {user.timestamp && (
                              <div className='text-xs text-gray-500'>
                                {new Date(
                                  user.timestamp * 1000
                                ).toLocaleDateString('pt-BR')}
                              </div>
                            )}
                          </div>
                          <span className='text-purple-500'>💔</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
