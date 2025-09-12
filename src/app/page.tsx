'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, ArrowRight, BookOpen, Upload, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className='min-h-screen gradient-bg'>
      {/* Header */}
      <header className='glass-effect sticky top-0 z-50'>
        <div className='container mx-auto px-4 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg'>
                <Users className='text-purple-600 w-5 h-5' />
              </div>
              <div>
                <h1 className='text-white font-bold text-xl'>FollowTracker</h1>
                <p className='text-white text-xs opacity-80'>
                  Gerencie seus seguidores do Instagram
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className='container mx-auto px-4 py-16'>
        <div className='text-center mb-16'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-white text-5xl lg:text-6xl font-bold mb-6'
          >
            Analise seus seguidores do Instagram
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white text-xl opacity-90 max-w-3xl mx-auto mb-8'
          >
            Descubra quem não está te seguindo de volta, seus seguidores mútuos
            e obtenha insights valiosos sobre seu perfil - tudo de forma privada
            e segura.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button
              onClick={() => router.push('/tutorial')}
              size='lg'
              className='bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-6 text-lg'
            >
              Começar Agora
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-3 gap-8 max-w-5xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className='p-6 text-center hover:shadow-xl transition-shadow'>
              <div className='w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BookOpen className='w-6 h-6 text-blue-600' />
              </div>
              <h3 className='font-semibold text-lg mb-2'>
                Tutorial Passo a Passo
              </h3>
              <p className='text-gray-600 text-sm'>
                Guia completo para exportar seus dados do Instagram de forma
                simples
              </p>
              <Button
                variant='ghost'
                className='mt-4'
                onClick={() => router.push('/tutorial')}
              >
                Ver Tutorial →
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className='p-6 text-center hover:shadow-xl transition-shadow'>
              <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <Upload className='w-6 h-6 text-green-600' />
              </div>
              <h3 className='font-semibold text-lg mb-2'>Upload Seguro</h3>
              <p className='text-gray-600 text-sm'>
                Seus dados são processados localmente, sem envio para servidores
              </p>
              <Button
                variant='ghost'
                className='mt-4'
                onClick={() => router.push('/upload')}
              >
                Fazer Upload →
              </Button>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className='p-6 text-center hover:shadow-xl transition-shadow'>
              <div className='w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <BarChart3 className='w-6 h-6 text-purple-600' />
              </div>
              <h3 className='font-semibold text-lg mb-2'>Análise Completa</h3>
              <p className='text-gray-600 text-sm'>
                Estatísticas detalhadas e insights sobre seus seguidores
              </p>
              <Button
                variant='ghost'
                className='mt-4'
                onClick={() => router.push('/upload')}
              >
                Ver Análise →
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Privacy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='mt-16 text-center'
        >
          <div className='inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full'>
            <span className='text-green-400'>🔒</span>
            <span className='text-white text-sm'>
              100% Privado • Sem Login • Processamento Local
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
