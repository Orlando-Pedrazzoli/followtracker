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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/ui/header';
import toast from 'react-hot-toast';

interface UploadedFile {
  name: string;
  size: number;
  type: 'followers' | 'following';
  data: any[];
  file: File;
}

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(file => {
        if (!file.name.endsWith('.json')) {
          toast.error(`${file.name} não é um arquivo JSON válido`);
          return;
        }

        const reader = new FileReader();
        reader.onload = e => {
          try {
            const content = e.target?.result as string;
            const jsonData = JSON.parse(content);

            let fileType: 'followers' | 'following';
            let processedData: any[];

            // Detectar tipo de arquivo baseado no nome e estrutura
            const fileName = file.name.toLowerCase();

            // Verificar se é followers_1, followers_2, etc ou apenas followers
            if (
              fileName.includes('follower') &&
              !fileName.includes('following')
            ) {
              fileType = 'followers';

              // O arquivo followers_1.json é um array direto
              if (Array.isArray(jsonData)) {
                processedData = jsonData;
              } else if (jsonData.relationships_followers) {
                // Formato alternativo do Instagram
                processedData = jsonData.relationships_followers;
              } else if (jsonData.followers) {
                processedData = jsonData.followers;
              } else {
                // Tentar extrair dados de qualquer estrutura
                processedData =
                  (Object.values(jsonData)[0] as any[]) || jsonData;
              }
            } else if (fileName.includes('following')) {
              fileType = 'following';

              // O arquivo following.json tem a chave relationships_following
              if (jsonData.relationships_following) {
                processedData = jsonData.relationships_following;
              } else if (Array.isArray(jsonData)) {
                processedData = jsonData;
              } else if (jsonData.following) {
                processedData = jsonData.following;
              } else {
                // Tentar extrair dados de qualquer estrutura
                processedData =
                  (Object.values(jsonData)[0] as any[]) || jsonData;
              }
            } else {
              toast.error(
                `Não foi possível identificar o tipo do arquivo ${file.name}. Use arquivos followers_1.json ou following.json`
              );
              return;
            }

            // Verificar se já existe um arquivo do mesmo tipo
            if (files.some(f => f.type === fileType)) {
              toast.error(
                `Já existe um arquivo de ${
                  fileType === 'followers' ? 'seguidores' : 'seguindo'
                } carregado`
              );
              return;
            }

            const newFile: UploadedFile = {
              name: file.name,
              size: file.size,
              type: fileType,
              data: processedData,
              file,
            };

            setFiles(prev => [...prev, newFile]);
            toast.success(`Arquivo ${file.name} carregado com sucesso!`);
          } catch (error) {
            console.error('Erro ao processar arquivo:', error);
            toast.error(
              `Erro ao processar ${file.name}: arquivo JSON inválido`
            );
          }
        };
        reader.readAsText(file);
      });
    },
    [files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
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
        'É necessário carregar ambos os arquivos (followers_1.json e following.json)'
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
    <div className='min-h-screen gradient-bg'>
      <Header
        subtitle='Upload dos arquivos'
        rightContent={
          <Button
            variant='ghost'
            onClick={() => router.push('/tutorial')}
            className='text-white hover:bg-white/20'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Voltar ao Tutorial
          </Button>
        }
      />

      <main className='container mx-auto px-4 py-8'>
        {/* Hero Section */}
        <div className='text-center mb-12'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-white text-3xl lg:text-4xl font-bold mb-4'
          >
            Faça upload dos seus arquivos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white text-lg opacity-90 max-w-2xl mx-auto'
          >
            Carregue os arquivos <strong>followers_1.json</strong> (ou
            followers_2.json, etc) e <strong>following.json</strong> que você
            baixou do Instagram
          </motion.p>
        </div>

        <div className='max-w-4xl mx-auto'>
          {/* Upload Area */}
          <Card className='mb-8'>
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
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }
                `}
              >
                <input {...getInputProps()} />
                <motion.div
                  animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileText className='w-16 h-16 mx-auto mb-4 text-gray-400' />
                  {isDragActive ? (
                    <p className='text-lg text-blue-600 font-medium'>
                      Solte os arquivos aqui...
                    </p>
                  ) : (
                    <>
                      <p className='text-lg font-medium mb-2'>
                        Arraste e solte os arquivos aqui, ou clique para
                        selecionar
                      </p>
                      <p className='text-sm text-gray-600'>
                        Arquivos suportados: .json (máx. 10MB cada)
                      </p>
                    </>
                  )}
                </motion.div>
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
                    <p className='font-medium'>followers_1.json</p>
                    <p className='text-sm text-gray-600'>
                      Lista de quem te segue
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
                    <p className='font-medium'>following.json</p>
                    <p className='text-sm text-gray-600'>
                      Lista de quem você segue
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <Card className='mb-8'>
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
                      Carregue o arquivo{' '}
                      {files.some(f => f.type === 'followers')
                        ? 'following.json'
                        : 'followers_1.json (ou followers_2.json)'}{' '}
                      para continuar
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className='flex justify-center'>
            <Button
              onClick={handleAnalyze}
              disabled={files.length !== 2 || isProcessing}
              className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg'
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
    </div>
  );
}
