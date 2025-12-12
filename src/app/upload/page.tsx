'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import {
  Upload,
  File,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  FileText,
  X,
  FileArchive,
  Loader2,
  Shield,
  Users,
  UserCheck,
  UserMinus,
  Hash,
  Ban,
  EyeOff,
  Ghost,
  Star,
  UserX,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import { Progress } from '@/components/ui/progress';
import toast from 'react-hot-toast';
import JSZip from 'jszip';
import {
  InstagramDataParser,
  InstagramAnalyzer,
  HistoryManager,
} from '@/lib/instagram-parser';
import { InstagramDataComplete } from '@/types/instagram';

interface FileTypeInfo {
  key: keyof InstagramDataComplete;
  name: string;
  fileName: string;
  icon: any;
  color: string;
  required: boolean;
}

const FILE_TYPES: FileTypeInfo[] = [
  {
    key: 'followers',
    name: 'Seguidores',
    fileName: 'followers_1.json',
    icon: Users,
    color: 'text-blue-500',
    required: true,
  },
  {
    key: 'following',
    name: 'Seguindo',
    fileName: 'following.json',
    icon: UserCheck,
    color: 'text-purple-500',
    required: true,
  },
  {
    key: 'closeFriends',
    name: 'Amigos Próximos',
    fileName: 'close_friends.json',
    icon: Star,
    color: 'text-yellow-500',
    required: false,
  },
  {
    key: 'blockedProfiles',
    name: 'Bloqueados',
    fileName: 'blocked_profiles.json',
    icon: Ban,
    color: 'text-red-500',
    required: false,
  },
  {
    key: 'recentlyUnfollowed',
    name: 'Unfollows Recentes',
    fileName: 'recently_unfollowed_profiles.json',
    icon: UserMinus,
    color: 'text-orange-500',
    required: false,
  },
  {
    key: 'followRequestsReceived',
    name: 'Solicitações Recebidas',
    fileName: "follow_requests_you've_received.json",
    icon: Clock,
    color: 'text-cyan-500',
    required: false,
  },
  {
    key: 'pendingFollowRequests',
    name: 'Solicitações Pendentes',
    fileName: 'pending_follow_requests.json',
    icon: Clock,
    color: 'text-indigo-500',
    required: false,
  },
  {
    key: 'recentFollowRequests',
    name: 'Solicitações Recentes',
    fileName: 'recent_follow_requests.json',
    icon: Clock,
    color: 'text-teal-500',
    required: false,
  },
  {
    key: 'hideStoryFrom',
    name: 'Stories Ocultos',
    fileName: 'hide_story_from.json',
    icon: EyeOff,
    color: 'text-gray-500',
    required: false,
  },
  {
    key: 'followingHashtags',
    name: 'Hashtags',
    fileName: 'following_hashtags.json',
    icon: Hash,
    color: 'text-green-500',
    required: false,
  },
  {
    key: 'restrictedProfiles',
    name: 'Restritos',
    fileName: 'restricted_profiles.json',
    icon: Shield,
    color: 'text-pink-500',
    required: false,
  },
  {
    key: 'removedSuggestions',
    name: 'Sugestões Removidas',
    fileName: 'removed_suggestions.json',
    icon: UserX,
    color: 'text-amber-500',
    required: false,
  },
];

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Map<keyof InstagramDataComplete, any>
  >(new Map());
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const router = useRouter();

  // Calcular progresso
  const requiredFiles = FILE_TYPES.filter(f => f.required);
  const uploadedRequired = requiredFiles.filter(f => uploadedFiles.has(f.key));
  const progress = (uploadedFiles.size / FILE_TYPES.length) * 100;
  const canAnalyze = uploadedRequired.length === requiredFiles.length;

  const processZipFile = async (file: File) => {
    setIsExtracting(true);
    setUploadProgress(0);

    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);

      const newFiles = new Map(uploadedFiles);
      const filesToProcess: { name: string; content: string }[] = [];

      // Procurar recursivamente por arquivos JSON em qualquer pasta
      for (const [path, zipEntry] of Object.entries(zipContent.files)) {
        if (zipEntry.dir) continue;

        // Pegar apenas o nome do arquivo, ignorando o caminho
        const fileName = path.split('/').pop() || '';

        if (fileName.toLowerCase().endsWith('.json')) {
          try {
            const content = await zipEntry.async('string');
            filesToProcess.push({ name: fileName, content });

            // Log para debug
            console.log(`Arquivo encontrado: ${fileName}`);
          } catch (err) {
            console.error(`Erro ao ler ${fileName}:`, err);
          }
        }
      }

      // Processar todos os arquivos encontrados
      const processedData =
        InstagramDataParser.parseMultipleFiles(filesToProcess);

      // Adicionar arquivos processados ao mapa
      let filesFound = 0;
      let notFollowingBackCount = 0;

      for (const [key, data] of Object.entries(processedData)) {
        if (Array.isArray(data) && data.length > 0) {
          newFiles.set(key as keyof InstagramDataComplete, data);
          filesFound++;

          const fileInfo = FILE_TYPES.find(f => f.key === key);
          if (fileInfo) {
            toast.success(`✅ ${fileInfo.name}: ${data.length} registros`);
          }
        }
      }

      setUploadedFiles(newFiles);
      setUploadProgress(100);

      if (filesFound === 0) {
        toast.error(
          'Nenhum arquivo válido encontrado no ZIP. Verifique se o ZIP contém os arquivos JSON do Instagram.'
        );
      } else {
        toast.success(`🎉 ${filesFound} arquivos extraídos com sucesso!`);

        // Se encontrou os arquivos principais, mostrar estatística rápida
        if (newFiles.has('followers') && newFiles.has('following')) {
          const followersSet = new Set(
            newFiles.get('followers')?.map((u: any) => u.username)
          );
          const following = newFiles.get('following') || [];
          notFollowingBackCount = following.filter((u: any) => !followersSet.has(u.username))

          if (notFollowingBackCount > 0) {
            toast.error(
              `⚠️ ATENÇÃO: ${notFollowingBackCount} pessoas não te seguem de volta!`,
              {
                duration: 6000,
                icon: '😢',
                style: {
                  background: '#FEE',
                  color: '#C00',
                  fontWeight: 'bold',
                },
              }
            );
          } else {
            toast.success(
              `✨ Perfeito! Todos que você segue também te seguem de volta!`,
              { duration: 5000 }
            );
          }
        }
      }
    } catch (error) {
      console.error('Erro ao processar ZIP:', error);
      toast.error(
        'Erro ao extrair arquivo ZIP. Tente arrastar os arquivos JSON individualmente.'
      );
    } finally {
      setIsExtracting(false);
      setUploadProgress(0);
    }
  };

  const processJsonFile = async (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      const content = e.target?.result as string;
      const { type, data } = InstagramDataParser.parseFile(file.name, content);

      if (type && data.length > 0) {
        const newFiles = new Map(uploadedFiles);
        newFiles.set(type, data);
        setUploadedFiles(newFiles);

        const fileInfo = FILE_TYPES.find(f => f.key === type);
        if (fileInfo) {
          toast.success(`✅ ${fileInfo.name}: ${data.length} registros`);
        }
      } else {
        toast.error(`Arquivo ${file.name} não reconhecido`);
      }
    };
    reader.readAsText(file);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        if (file.name.toLowerCase().endsWith('.zip')) {
          await processZipFile(file);
        } else if (file.name.endsWith('.json')) {
          await processJsonFile(file);
        } else {
          toast.error(`${file.name} não é um arquivo válido`);
        }
      }
    },
    [uploadedFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
    },
    multiple: true,
  });

  const handleAnalyze = async () => {
    if (!canAnalyze) {
      toast.error('Upload os arquivos obrigatórios primeiro');
      return;
    }

    setIsProcessing(true);

    try {
      // Construir objeto InstagramDataComplete
      const completeData: InstagramDataComplete = {
        followers: uploadedFiles.get('followers') || [],
        following: uploadedFiles.get('following') || [],
        closeFriends: uploadedFiles.get('closeFriends') || [],
        blockedProfiles: uploadedFiles.get('blockedProfiles') || [],
        recentlyUnfollowed: uploadedFiles.get('recentlyUnfollowed') || [],
        followRequestsReceived:
          uploadedFiles.get('followRequestsReceived') || [],
        pendingFollowRequests: uploadedFiles.get('pendingFollowRequests') || [],
        recentFollowRequests: uploadedFiles.get('recentFollowRequests') || [],
        hideStoryFrom: uploadedFiles.get('hideStoryFrom') || [],
        followingHashtags: uploadedFiles.get('followingHashtags') || [],
        restrictedProfiles: uploadedFiles.get('restrictedProfiles') || [],
        removedSuggestions: uploadedFiles.get('removedSuggestions') || [],
      };

      // Gerar análise completa
      const analysis = InstagramAnalyzer.analyze(completeData);

      // Salvar no histórico
      const analysisId = HistoryManager.saveAnalysis(analysis);

      // Salvar análise atual no localStorage para a página de análise
      localStorage.setItem('current-analysis', JSON.stringify(analysis));
      localStorage.setItem('current-analysis-id', analysisId);

      // Alerta com estatística principal
      const notFollowingBackCount = analysis.stats.notFollowingBackCount;
      if (notFollowingBackCount > 0) {
        toast.error(
          `🚫 ${notFollowingBackCount} pessoas não te seguem de volta!`,
          { duration: 5000 }
        );
      }

      toast.success('Análise completa gerada!');
      router.push('/analyze');
    } catch (error) {
      console.error('Erro ao analisar:', error);
      toast.error('Erro ao processar análise');
    } finally {
      setIsProcessing(false);
    }
  };

  const removeFile = (key: keyof InstagramDataComplete) => {
    const newFiles = new Map(uploadedFiles);
    newFiles.delete(key);
    setUploadedFiles(newFiles);
    toast.success('Arquivo removido');
  };

  return (
    <div className='min-h-screen gradient-bg flex flex-col'>
      <Header
        subtitle='Upload de Dados do Instagram'
        rightContent={
          <Button
            variant='ghost'
            onClick={() => router.push('/tutorial')}
            className='btn-header'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Tutorial
          </Button>
        }
      />

      <main className='container mx-auto px-4 py-8 flex-1'>
        {/* Hero Section */}
        <div className='text-center mb-8'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-white text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg'
          >
            🔍 Descubra Quem Não Te Segue de Volta
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white text-lg opacity-90 max-w-2xl mx-auto drop-shadow'
          >
            Análise completa com <strong>detector de bloqueios</strong>,
            unfollowers e estatísticas detalhadas do seu perfil
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className='max-w-4xl mx-auto mb-8'>
          <Card className='card-instagram'>
            <CardContent className='pt-6'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-medium'>
                  {uploadedFiles.size} de {FILE_TYPES.length} arquivos
                </span>
                <span className='text-sm font-medium'>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className='h-2' />
              {!canAnalyze && uploadedFiles.size > 0 && (
                <p className='text-xs text-amber-600 mt-2'>
                  ⚠️ Upload os arquivos obrigatórios (Seguidores e Seguindo)
                  para continuar
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className='max-w-6xl mx-auto'>
          {/* Upload Area */}
          <Card className='mb-8 card-instagram'>
            <CardHeader>
              <CardTitle className='text-center'>
                <Upload className='w-8 h-8 mx-auto mb-2' />
                Arraste o ZIP do Instagram aqui
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
                  ${
                    isDragActive
                      ? 'border-purple-500 bg-purple-50'
                      : isExtracting
                      ? 'border-purple-500 bg-purple-50 animate-pulse'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                <input {...getInputProps()} />
                {isExtracting ? (
                  <>
                    <Loader2 className='w-16 h-16 mx-auto mb-4 text-purple-500 animate-spin' />
                    <p className='text-lg text-purple-600 font-medium'>
                      Extraindo arquivos do ZIP...
                    </p>
                    {uploadProgress > 0 && (
                      <Progress
                        value={uploadProgress}
                        className='w-64 mx-auto mt-4'
                      />
                    )}
                  </>
                ) : (
                  <>
                    <FileArchive className='w-16 h-16 mx-auto mb-4 text-purple-400' />
                    <p className='text-lg font-medium mb-2'>
                      Arraste o arquivo ZIP completo do Instagram
                    </p>
                    <p className='text-sm text-gray-600'>
                      ou clique para selecionar arquivos JSON individuais
                    </p>
                    <div className='mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3 max-w-md mx-auto'>
                      <p className='text-xs text-yellow-800'>
                        <strong>📌 Dica:</strong> O ZIP do Instagram contém uma
                        pasta com todos os JSONs. Nosso sistema processa
                        automaticamente!
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Files Status Grid */}
          <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8'>
            {FILE_TYPES.map(fileType => {
              const hasFile = uploadedFiles.has(fileType.key);
              const fileData = uploadedFiles.get(fileType.key);
              const Icon = fileType.icon;

              return (
                <motion.div
                  key={fileType.key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`relative ${
                    !hasFile && !fileType.required ? 'opacity-60' : ''
                  }`}
                >
                  <Card
                    className={`
                    ${
                      hasFile
                        ? 'border-green-200 bg-green-50'
                        : fileType.required
                        ? 'border-amber-200 bg-amber-50'
                        : 'border-gray-200'
                    }
                  `}
                  >
                    <CardContent className='pt-6'>
                      <div className='flex items-center justify-between mb-3'>
                        <Icon className={`w-6 h-6 ${fileType.color}`} />
                        {hasFile && (
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeFile(fileType.key)}
                            className='h-6 w-6 p-0 hover:bg-red-100'
                          >
                            <X className='w-4 h-4 text-red-500' />
                          </Button>
                        )}
                      </div>
                      <h3 className='font-medium text-sm mb-1'>
                        {fileType.name}
                      </h3>
                      {hasFile ? (
                        <div>
                          <p className='text-xs text-green-600 font-semibold'>
                            ✅ {Array.isArray(fileData) ? fileData.length : 0}{' '}
                            registros
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p className='text-xs text-gray-500'>
                            {fileType.fileName}
                          </p>
                          {fileType.required && (
                            <Badge
                              variant='destructive'
                              className='text-xs mt-1'
                            >
                              Obrigatório
                            </Badge>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Alert for Not Following Back */}
          {uploadedFiles.has('followers') && uploadedFiles.has('following') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mb-8'
            >
              <Card className='border-red-200 bg-gradient-to-r from-red-50 to-pink-50'>
                <CardContent className='pt-6'>
                  <div className='flex items-center gap-3'>
                    <AlertTriangle className='w-8 h-8 text-red-500 flex-shrink-0' />
                    <div>
                      <h3 className='text-lg font-bold text-red-800'>
                        Análise Rápida
                      </h3>
                      <p className='text-red-700'>
                        {(() => {
                          const followersSet = new Set(
                            uploadedFiles
                              .get('followers')
                              ?.map((u: any) => u.username) || []
                          );
                          const following =
                            uploadedFiles.get('following') || [];
                          const notFollowingBack = following.filter((u: any) => !followersSet.has(u.username));
                          return notFollowingBack.length > 0
                            ? `${notFollowingBack.length} pessoas não te seguem de volta! Clique em analisar para ver quem são.`
                            : 'Todos que você segue também te seguem de volta! 🎉';
                        })()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Analysis Button */}
          <div className='flex justify-center'>
            <Button
              onClick={handleAnalyze}
              disabled={!canAnalyze || isProcessing}
              size='lg'
              className={`
                ${
                  canAnalyze
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                    : 'bg-gray-400'
                }
                text-white px-8 py-6 text-lg shadow-xl
              `}
            >
              {isProcessing ? (
                <>
                  <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                  Analisando...
                </>
              ) : (
                <>
                  🔍 Ver Quem Não Te Segue
                  <ArrowRight className='w-5 h-5 ml-2' />
                </>
              )}
            </Button>
          </div>

          {/* Features Preview */}
          {uploadedFiles.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-8'
            >
              <Card className='border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50'>
                <CardHeader>
                  <CardTitle className='text-purple-800'>
                    🎯 O que você vai descobrir:
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid md:grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-red-500' />
                        <strong className='text-red-700'>
                          Quem não te segue de volta
                        </strong>
                      </p>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-orange-500' />
                        <strong>Detector de Bloqueios:</strong> 60-90% precisão
                      </p>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-green-500' />
                        <strong>Seguidores Mútuos</strong>
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-purple-500' />
                        <strong>Unfollows Recentes</strong>
                      </p>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-blue-500' />
                        <strong>Taxa de Engajamento</strong>
                      </p>
                      <p className='text-sm flex items-center gap-2'>
                        <CheckCircle className='w-4 h-4 text-pink-500' />
                        <strong>Score Social</strong>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Privacy Notice */}
          <Card className='mt-8 border-green-200 bg-green-50'>
            <CardContent className='pt-6'>
              <div className='flex items-start space-x-3'>
                <Shield className='w-5 h-5 text-green-600 mt-0.5' />
                <div>
                  <p className='font-medium text-green-800 mb-1'>
                    🔒 100% Privado e Seguro
                  </p>
                  <p className='text-sm text-green-700'>
                    Processamento 100% local. Nenhum dado é enviado para
                    servidores. Seus dados ficam apenas no seu navegador.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
