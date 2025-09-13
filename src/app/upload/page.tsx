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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/ui/header';
import { Footer } from '@/components/ui/footer';
import toast from 'react-hot-toast';
import JSZip from 'jszip';

interface UploadedFile {
  name: string;
  size: number;
  type: 'followers' | 'following';
  data: any[];
  file: File | { name: string; size: number }; // Aceitar File ou objeto simulado
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const router = useRouter();

  // Função para processar conteúdo JSON
  const processJsonContent = (
    fileName: string,
    content: string,
    fileSize: number = 0,
    originalFile?: File
  ): UploadedFile | null => {
    try {
      const jsonData = JSON.parse(content);
      let fileType: 'followers' | 'following';
      let processedData: any[];

      const lowerFileName = fileName.toLowerCase();

      // Verificar se é followers_1, followers_2, etc ou apenas followers
      if (
        lowerFileName.includes('follower') &&
        !lowerFileName.includes('following')
      ) {
        fileType = 'followers';

        // O arquivo followers_1.json é um array direto
        if (Array.isArray(jsonData)) {
          processedData = jsonData;
        } else if (jsonData.relationships_followers) {
          processedData = jsonData.relationships_followers;
        } else if (jsonData.followers) {
          processedData = jsonData.followers;
        } else {
          processedData = (Object.values(jsonData)[0] as any[]) || jsonData;
        }
      } else if (lowerFileName.includes('following')) {
        fileType = 'following';

        // O arquivo following.json tem a chave relationships_following
        if (jsonData.relationships_following) {
          processedData = jsonData.relationships_following;
        } else if (Array.isArray(jsonData)) {
          processedData = jsonData;
        } else if (jsonData.following) {
          processedData = jsonData.following;
        } else {
          processedData = (Object.values(jsonData)[0] as any[]) || jsonData;
        }
      } else {
        toast.error(
          `Não foi possível identificar o tipo do arquivo ${fileName}. Use arquivos followers_*.json ou following.json`
        );
        return null;
      }

      // Verificar se já existe um arquivo do mesmo tipo
      if (files.some(f => f.type === fileType)) {
        toast.error(
          `Já existe um arquivo de ${
            fileType === 'followers' ? 'seguidores' : 'seguindo'
          } carregado`
        );
        return null;
      }

      return {
        name: fileName,
        size: fileSize || content.length,
        type: fileType,
        data: processedData,
        file: originalFile || {
          name: fileName,
          size: fileSize || content.length,
        },
      };
    } catch (error) {
      console.error('Erro ao processar arquivo:', error);
      toast.error(`Erro ao processar ${fileName}: arquivo JSON inválido`);
      return null;
    }
  };

  // Função para processar arquivo JSON do upload direto
  const processJsonFile = (
    file: File,
    content: string
  ): UploadedFile | null => {
    return processJsonContent(file.name, content, file.size, file);
  };

  // Função para processar arquivo ZIP
  const processZipFile = async (file: File) => {
    setIsExtracting(true);
    try {
      const zip = new JSZip();
      const zipContent = await zip.loadAsync(file);

      const extractedFiles: UploadedFile[] = [];
      let foundFollowers = false;
      let foundFollowing = false;

      // Procurar por arquivos JSON no ZIP
      for (const [fileName, zipEntry] of Object.entries(zipContent.files)) {
        if (zipEntry.dir) continue; // Pular diretórios

        const lowerFileName = fileName.toLowerCase();

        // Procurar por followers*.json ou following.json em qualquer pasta
        if (lowerFileName.endsWith('.json')) {
          // Verificar se é um arquivo de followers ou following
          const isFollowers =
            lowerFileName.includes('followers_') ||
            (lowerFileName.includes('followers') &&
              !lowerFileName.includes('following'));
          const isFollowing = lowerFileName.includes('following');

          if (isFollowers && !foundFollowers) {
            const content = await zipEntry.async('string');
            const extractedFileName =
              fileName.split('/').pop() || 'followers.json';
            const processedFile = processJsonContent(
              extractedFileName,
              content,
              content.length
            );

            if (processedFile && !files.some(f => f.type === 'followers')) {
              extractedFiles.push(processedFile);
              foundFollowers = true;
              toast.success(
                `✅ Arquivo de seguidores encontrado: ${extractedFileName}`
              );
            }
          } else if (isFollowing && !foundFollowing) {
            const content = await zipEntry.async('string');
            const extractedFileName =
              fileName.split('/').pop() || 'following.json';
            const processedFile = processJsonContent(
              extractedFileName,
              content,
              content.length
            );

            if (processedFile && !files.some(f => f.type === 'following')) {
              extractedFiles.push(processedFile);
              foundFollowing = true;
              toast.success(
                `✅ Arquivo de seguindo encontrado: ${extractedFileName}`
              );
            }
          }
        }
      }

      if (extractedFiles.length === 0) {
        toast.error(
          'Nenhum arquivo válido encontrado no ZIP. Certifique-se de que o ZIP contém followers_*.json e following.json'
        );
      } else {
        setFiles(prev => [...prev, ...extractedFiles]);

        if (extractedFiles.length === 2) {
          toast.success('🎉 Ambos os arquivos foram extraídos com sucesso!');
        } else if (!foundFollowers) {
          toast(
            '⚠️ Arquivo de seguidores não encontrado. Adicione manualmente.',
            { icon: '📋' }
          );
        } else if (!foundFollowing) {
          toast(
            '⚠️ Arquivo de seguindo não encontrado. Adicione manualmente.',
            { icon: '📋' }
          );
        }
      }
    } catch (error) {
      console.error('Erro ao processar arquivo ZIP:', error);
      toast.error(
        'Erro ao extrair arquivo ZIP. Tente fazer upload dos arquivos JSON individualmente.'
      );
    } finally {
      setIsExtracting(false);
    }
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      for (const file of acceptedFiles) {
        // Verificar se é um arquivo ZIP
        if (file.name.toLowerCase().endsWith('.zip')) {
          await processZipFile(file);
        }
        // Processar arquivo JSON normal
        else if (file.name.endsWith('.json')) {
          const reader = new FileReader();
          reader.onload = e => {
            const content = e.target?.result as string;
            const processedFile = processJsonFile(file, content);
            if (processedFile) {
              setFiles(prev => [...prev, processedFile]);
              toast.success(`Arquivo ${file.name} carregado com sucesso!`);
            }
          };
          reader.readAsText(file);
        } else {
          toast.error(
            `${file.name} não é um arquivo válido. Use arquivos .json ou .zip`
          );
        }
      }
    },
    [files]
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

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    toast.success('Arquivo removido');
  };

  const handleAnalyze = async () => {
    if (files.length !== 2) {
      toast.error(
        'É necessário carregar ambos os arquivos (followers e following)'
      );
      return;
    }

    setIsProcessing(true);

    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Salvar dados no localStorage para a página de análise
    const followersFile = files.find(f => f.type === 'followers');
    const followingFile = files.find(f => f.type === 'following');

    if (followersFile && followingFile) {
      localStorage.setItem(
        'instagram-data',
        JSON.stringify({
          followers: followersFile.data,
          following: followingFile.data,
          uploadedAt: new Date().toISOString(),
        })
      );

      router.push('/analyze');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className='min-h-screen gradient-bg flex flex-col'>
      <Header
        subtitle='Upload dos arquivos'
        rightContent={
          <Button
            variant='ghost'
            onClick={() => router.push('/tutorial')}
            className='btn-header'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar ao Tutorial
          </Button>
        }
      />

      <main className='container mx-auto px-4 py-8 flex-1'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-white text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg'
          >
            Faça upload dos seus arquivos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white text-lg opacity-90 max-w-2xl mx-auto drop-shadow'
          >
            <strong>🎉 Novo!</strong> Agora você pode arrastar o arquivo{' '}
            <strong>ZIP do Instagram</strong> diretamente ou fazer upload dos
            arquivos JSON individualmente
          </motion.p>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Upload Area */}
          <Card className='mb-8 card-instagram'>
            <CardHeader>
              <CardTitle className='text-center'>
                <Upload className='w-8 h-8 mx-auto mb-2' />
                Área de Upload
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
                  ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : isExtracting
                      ? 'border-purple-500 bg-purple-50 animate-pulse'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {isExtracting ? (
                    <>
                      <Loader2 className='w-16 h-16 mx-auto mb-4 text-purple-500 animate-spin' />
                      <p className='text-lg text-purple-600 font-medium'>
                        Extraindo arquivos do ZIP...
                      </p>
                      <p className='text-sm text-purple-500 mt-2'>
                        Aguarde um momento
                      </p>
                    </>
                  ) : (
                    <>
                      <div className='flex justify-center gap-4 mb-4'>
                        <FileArchive className='w-16 h-16 text-purple-400' />
                        <FileText className='w-16 h-16 text-gray-400' />
                      </div>
                      {isDragActive ? (
                        <p className='text-lg text-blue-600 font-medium'>
                          Solte os arquivos aqui...
                        </p>
                      ) : (
                        <>
                          <p className='text-lg font-medium mb-2'>
                            Arraste o{' '}
                            <span className='text-purple-600 font-bold'>
                              arquivo ZIP do Instagram
                            </span>{' '}
                            aqui
                          </p>
                          <p className='text-sm text-gray-600 mb-2'>
                            ou arquivos JSON individuais
                          </p>
                          <p className='text-xs text-gray-500'>
                            Suportamos: .zip (recomendado) ou .json (manual)
                          </p>
                        </>
                      )}
                    </>
                  )}
                </motion.div>
              </div>

              {/* Info Cards */}
              <div className='mt-6 grid md:grid-cols-2 gap-4'>
                <div className='p-4 bg-purple-50 border border-purple-200 rounded-lg'>
                  <div className='flex items-start space-x-3'>
                    <FileArchive className='w-6 h-6 text-purple-600 mt-0.5' />
                    <div>
                      <p className='font-semibold text-purple-900'>
                        Método Recomendado
                      </p>
                      <p className='text-sm text-purple-700 mt-1'>
                        Arraste o arquivo ZIP baixado do Instagram diretamente.
                        Extraímos automaticamente os arquivos necessários!
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-gray-50 border border-gray-200 rounded-lg'>
                  <div className='flex items-start space-x-3'>
                    <FileText className='w-6 h-6 text-gray-600 mt-0.5' />
                    <div>
                      <p className='font-semibold text-gray-900'>
                        Método Alternativo
                      </p>
                      <p className='text-sm text-gray-700 mt-1'>
                        Extraia o ZIP manualmente e faça upload de
                        followers_*.json e following.json
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Files Info */}
              <div className='mt-6 grid md:grid-cols-2 gap-4'>
                <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      files.some(f => f.type === 'followers')
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {files.some(f => f.type === 'followers') ? (
                      <CheckCircle className='w-4 h-4 text-white' />
                    ) : (
                      <File className='w-4 h-4 text-gray-600' />
                    )}
                  </div>
                  <div>
                    <p className='font-medium'>Seguidores</p>
                    <p className='text-sm text-gray-600'>
                      {files.some(f => f.type === 'followers')
                        ? `✅ ${
                            files.find(f => f.type === 'followers')?.data.length
                          } registros`
                        : 'Aguardando arquivo'}
                    </p>
                  </div>
                </div>

                <div className='flex items-center space-x-3 p-3 bg-gray-50 rounded-lg'>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      files.some(f => f.type === 'following')
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  >
                    {files.some(f => f.type === 'following') ? (
                      <CheckCircle className='w-4 h-4 text-white' />
                    ) : (
                      <File className='w-4 h-4 text-gray-600' />
                    )}
                  </div>
                  <div>
                    <p className='font-medium'>Seguindo</p>
                    <p className='text-sm text-gray-600'>
                      {files.some(f => f.type === 'following')
                        ? `✅ ${
                            files.find(f => f.type === 'following')?.data.length
                          } registros`
                        : 'Aguardando arquivo'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <Card className='mb-8 card-instagram'>
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  Arquivos Carregados
                  <Badge variant='secondary'>{files.length}/2</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {files.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'
                    >
                      <div className='flex items-center space-x-3'>
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            file.type === 'followers'
                              ? 'bg-blue-100'
                              : 'bg-green-100'
                          }`}
                        >
                          <File
                            className={`w-5 h-5 ${
                              file.type === 'followers'
                                ? 'text-blue-600'
                                : 'text-green-600'
                            }`}
                          />
                        </div>
                        <div>
                          <p className='font-medium'>{file.name}</p>
                          <p className='text-sm text-gray-600'>
                            {formatFileSize(file.size)} • {file.data.length}{' '}
                            registros
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <Badge
                          variant={
                            file.type === 'followers' ? 'default' : 'secondary'
                          }
                        >
                          {file.type === 'followers'
                            ? 'Seguidores'
                            : 'Seguindo'}
                        </Badge>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => removeFile(index)}
                          className='text-red-500 hover:text-red-700 hover:bg-red-50'
                        >
                          <X className='w-4 h-4' />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Progress Indicator */}
          {files.length > 0 && files.length < 2 && (
            <Card className='mb-8 border-amber-200 bg-amber-50'>
              <CardContent className='pt-6'>
                <div className='flex items-center space-x-3'>
                  <AlertCircle className='w-5 h-5 text-amber-600' />
                  <div>
                    <p className='font-medium text-amber-800'>
                      Falta {2 - files.length} arquivo
                      {2 - files.length > 1 ? 's' : ''}
                    </p>
                    <p className='text-sm text-amber-700'>
                      {files.some(f => f.type === 'followers')
                        ? 'Arquivo de "seguindo" não encontrado'
                        : 'Arquivo de "seguidores" não encontrado'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Success Message when both files are loaded */}
          {files.length === 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className='mb-8'
            >
              <Card className='border-green-200 bg-green-50'>
                <CardContent className='pt-6'>
                  <div className='flex items-center space-x-3'>
                    <CheckCircle className='w-6 h-6 text-green-600' />
                    <div>
                      <p className='font-medium text-green-800'>
                        Tudo pronto para análise!
                      </p>
                      <p className='text-sm text-green-700'>
                        Ambos os arquivos foram carregados com sucesso
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className='flex justify-center'>
            <Button
              onClick={handleAnalyze}
              disabled={files.length !== 2 || isProcessing}
              className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg shadow-xl'
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className='w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full'
                  />
                  Analisando...
                </>
              ) : (
                <>
                  Analisar Seguidores
                  <ArrowRight className='w-5 h-5 ml-2' />
                </>
              )}
            </Button>
          </div>

          {/* Privacy Notice */}
          <Card className='mt-8 border-green-200 bg-green-50'>
            <CardContent className='pt-6'>
              <div className='flex items-start space-x-3'>
                <CheckCircle className='w-5 h-5 text-green-600 mt-0.5' />
                <div>
                  <p className='font-medium text-green-800 mb-1'>
                    🔒 100% Privado e Seguro
                  </p>
                  <p className='text-sm text-green-700'>
                    Seus dados são processados apenas no seu navegador. Nenhuma
                    informação é enviada para nossos servidores. Os arquivos
                    ficam armazenados localmente e podem ser removidos a
                    qualquer momento.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
