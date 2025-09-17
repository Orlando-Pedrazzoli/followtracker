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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Card } from '@/components/ui/card';
import RevolutionaryDashboard from '@/components/ui/RevolutionaryDashboard';
import { CompleteAnalysis } from '@/types/instagram';
import { InstagramAnalyzer, HistoryManager } from '@/lib/instagram-parser';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';

export default function AnalyzePage() {
  const [analysis, setAnalysis] = useState<CompleteAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);
  const [historicalAnalyses, setHistoricalAnalyses] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadAnalysis();
  }, []);

  const loadAnalysis = () => {
    try {
      // Tentar carregar análise atual
      const currentAnalysis = localStorage.getItem('current-analysis');

      if (currentAnalysis) {
        const analysisData = JSON.parse(currentAnalysis);
        setAnalysis(analysisData);
        setIsLoading(false);

        // Carregar histórico
        const history = HistoryManager.getHistory();
        setHistoricalAnalyses(history);

        // Comparar com análise anterior se existir
        const comparison = HistoryManager.compareWithPrevious(analysisData);
        if (comparison) {
          // Adicionar suspeitos de bloqueio
          analysisData.relationships.suspicious =
            comparison.changes.possibleBlocks;
          setAnalysis({ ...analysisData });

          if (comparison.changes.possibleBlocks.length > 0) {
            toast.error(
              `⚠️ ${comparison.changes.possibleBlocks.length} possíveis bloqueios detectados!`,
              { duration: 5000 }
            );
          }
        }

        toast.success('Análise carregada com sucesso!');
      } else {
        // Se não houver análise, verificar se há histórico
        const latestAnalysis = HistoryManager.getLatestAnalysis();
        if (latestAnalysis) {
          setAnalysis(latestAnalysis.analysis);
          setIsLoading(false);
          toast.success('Última análise carregada do histórico');
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar análise:', error);
      setIsLoading(false);
      toast.error('Erro ao carregar análise');
    }
  };

  const handleExport = (data: any, format: string) => {
    if (format === 'pdf') {
      exportToPDF();
    } else if (format === 'json') {
      exportToJSON();
    } else if (format === 'csv') {
      exportToCSV();
    }
  };

  const exportToPDF = () => {
    if (!analysis) return;

    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(20);
    doc.setTextColor(139, 92, 246); // Purple
    doc.text('FollowerScan', 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Análise Revolucionária do Instagram', 14, 30);

    // Data
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 40);

    // Score Social
    doc.setFontSize(16);
    doc.setTextColor(139, 92, 246);
    doc.text(
      `Score Social: ${Math.round(analysis.socialHealth.overallScore)}/100`,
      14,
      55
    );

    // Estatísticas
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let yPos = 70;

    doc.text('📊 Estatísticas Gerais:', 14, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`• Seguidores: ${analysis.stats.totalFollowers}`, 20, yPos);
    yPos += 7;
    doc.text(`• Seguindo: ${analysis.stats.totalFollowing}`, 20, yPos);
    yPos += 7;
    doc.text(`• Mútuos: ${analysis.stats.mutualCount}`, 20, yPos);
    yPos += 7;
    doc.text(
      `• Taxa de Engajamento: ${analysis.stats.engagementRatio.toFixed(1)}%`,
      20,
      yPos
    );

    // Círculos Sociais
    yPos += 15;
    doc.setFontSize(12);
    doc.text('👥 Círculos Sociais:', 14, yPos);
    yPos += 10;
    doc.setFontSize(10);
    doc.text(`• VIPs: ${analysis.relationships.vips.length}`, 20, yPos);
    yPos += 7;
    doc.text(`• Fans: ${analysis.relationships.fans.length}`, 20, yPos);
    yPos += 7;
    doc.text(`• Crushes: ${analysis.relationships.crushes.length}`, 20, yPos);
    yPos += 7;
    doc.text(`• Ghosts: ${analysis.relationships.ghosts.length}`, 20, yPos);

    // Alertas
    if (analysis.socialHealth.alerts.length > 0) {
      yPos += 15;
      doc.setFontSize(12);
      doc.text('⚠️ Alertas Importantes:', 14, yPos);
      yPos += 10;
      doc.setFontSize(10);

      analysis.socialHealth.alerts.slice(0, 3).forEach(alert => {
        doc.text(`• ${alert.title}`, 20, yPos);
        yPos += 7;
      });
    }

    // Recomendações
    if (analysis.socialHealth.recommendations.length > 0) {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(12);
      doc.text('💡 Recomendações:', 14, yPos);
      yPos += 10;
      doc.setFontSize(10);

      analysis.socialHealth.recommendations.forEach(rec => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        const lines = doc.splitTextToSize(`• ${rec}`, 170);
        lines.forEach((line: string) => {
          doc.text(line, 20, yPos);
          yPos += 7;
        });
      });
    }

    // Rodapé
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Página ${i} de ${pageCount} | FollowerScan - www.followerscan.com`,
        doc.internal.pageSize.width / 2,
        doc.internal.pageSize.height - 10,
        { align: 'center' }
      );
    }

    doc.save(
      `followerscan_analysis_${new Date().toISOString().split('T')[0]}.pdf`
    );
    toast.success('PDF exportado com sucesso!');
  };

  const exportToJSON = () => {
    if (!analysis) return;

    const dataStr = JSON.stringify(analysis, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `followerscan_analysis_${
      new Date().toISOString().split('T')[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('JSON exportado com sucesso!');
  };

  const exportToCSV = () => {
    if (!analysis) return;

    // Criar CSV com principais métricas
    const csvData = [
      ['FollowerScan - Análise do Instagram'],
      ['Data', new Date().toLocaleString('pt-BR')],
      [''],
      ['Métrica', 'Valor'],
      ['Score Social', Math.round(analysis.socialHealth.overallScore)],
      ['Seguidores', analysis.stats.totalFollowers],
      ['Seguindo', analysis.stats.totalFollowing],
      ['Mútuos', analysis.stats.mutualCount],
      ['Taxa de Engajamento', `${analysis.stats.engagementRatio.toFixed(1)}%`],
      ['VIPs', analysis.relationships.vips.length],
      ['Fans', analysis.relationships.fans.length],
      ['Crushes', analysis.relationships.crushes.length],
      ['Ghosts', analysis.relationships.ghosts.length],
      ['Bloqueados', analysis.stats.blockedCount],
      ['Restritos', analysis.stats.restrictedCount],
      ['Close Friends', analysis.stats.closeFriendsCount],
      ['Hashtags Seguidas', analysis.basicData.followingHashtags.length],
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `followerscan_metrics_${
      new Date().toISOString().split('T')[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success('CSV exportado com sucesso!');
  };

  const handleShare = async () => {
    if (!analysis || !navigator.share) {
      // Fallback para copiar
      const text = `🚀 Minha Análise FollowerScan
      
📊 Score Social: ${Math.round(analysis?.socialHealth.overallScore || 0)}/100
👥 Seguidores: ${analysis?.stats.totalFollowers || 0}
✅ Mútuos: ${analysis?.stats.mutualCount || 0}
💜 VIPs: ${analysis?.relationships.vips.length || 0}

Faça sua análise em: www.followerscan.com`;

      navigator.clipboard.writeText(text);
      toast.success('Copiado para área de transferência!');
      return;
    }

    try {
      await navigator.share({
        title: 'Minha Análise FollowerScan',
        text: `Score Social: ${Math.round(
          analysis.socialHealth.overallScore
        )}/100 | ${analysis.stats.totalFollowers} seguidores`,
        url: 'https://www.followerscan.com',
      });
    } catch (error) {
      console.log('Share cancelled');
    }
  };

  const handleCompare = () => {
    setShowHistory(!showHistory);
    if (!showHistory && historicalAnalyses.length === 0) {
      toast.error('Nenhuma análise anterior para comparar');
    }
  };

  const saveCurrentAnalysis = () => {
    if (!analysis) return;

    const id = HistoryManager.saveAnalysis(analysis);
    setHistoricalAnalyses(HistoryManager.getHistory());
    toast.success('Análise salva no histórico!');
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

  if (isLoading) {
    return (
      <div className='min-h-screen gradient-bg flex items-center justify-center'>
        <div className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className='w-16 h-16 border-4 border-white border-t-transparent rounded-full mx-auto mb-4'
          />
          <p className='text-white text-lg'>
            Carregando análise revolucionária...
          </p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className='min-h-screen gradient-bg flex flex-col'>
        <Header
          subtitle='Dashboard Revolucionário'
          rightContent={
            <Button
              variant='ghost'
              onClick={() => router.push('/')}
              className='btn-header'
            >
              <ArrowLeft className='w-4 h-4 mr-2' />
              Início
            </Button>
          }
        />

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
                Faça upload dos seus arquivos do Instagram para começar a
                análise revolucionária.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className='max-w-md mx-auto'
            >
              <Card className='p-6 text-center hover:shadow-xl transition-shadow card-instagram'>
                <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <Upload className='w-6 h-6 text-purple-600' />
                </div>
                <h3 className='font-semibold text-lg mb-2'>
                  Upload de 12 Tipos de Dados
                </h3>
                <p className='text-gray-600 text-sm mb-4'>
                  Análise completa com detector de bloqueios e score social
                </p>
                <Button
                  onClick={() => router.push('/upload')}
                  className='bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
                >
                  Começar Upload →
                </Button>
              </Card>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className='min-h-screen gradient-bg flex flex-col'>
      <Header
        subtitle={`Score Social: ${Math.round(
          analysis.socialHealth.overallScore
        )}/100`}
        rightContent={
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              onClick={saveCurrentAnalysis}
              className='btn-header hidden md:flex'
              title='Salvar no histórico'
            >
              <Save className='w-4 h-4 mr-2' />
              Salvar
            </Button>
            <Button
              variant='ghost'
              onClick={handleCompare}
              className='btn-header hidden md:flex'
              title='Comparar com histórico'
            >
              <History className='w-4 h-4 mr-2' />
              Histórico
            </Button>
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
        {/* Histórico (se ativo) */}
        {showHistory && historicalAnalyses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mb-8'
          >
            <Card className='p-6'>
              <h3 className='font-bold text-lg mb-4'>📊 Análises Anteriores</h3>
              <div className='space-y-2'>
                {historicalAnalyses.slice(0, 5).map(hist => (
                  <div
                    key={hist.id}
                    className='flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer'
                    onClick={() => {
                      setAnalysis(hist.analysis);
                      setShowHistory(false);
                      toast.success('Análise histórica carregada');
                    }}
                  >
                    <div>
                      <p className='font-medium'>{hist.label}</p>
                      <p className='text-xs text-gray-500'>
                        Score:{' '}
                        {Math.round(hist.analysis.socialHealth.overallScore)} |{' '}
                        {hist.analysis.stats.totalFollowers} seguidores
                      </p>
                    </div>
                    <p className='text-sm text-gray-400'>
                      {new Date(hist.timestamp).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Dashboard Principal */}
        <RevolutionaryDashboard
          analysis={analysis}
          onExport={handleExport}
          onShare={handleShare}
          onCompare={handleCompare}
        />
      </main>

      <Footer />
    </div>
  );
}
