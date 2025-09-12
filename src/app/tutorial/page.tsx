'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  UserCircle,
  CheckSquare,
  Download,
  Mail,
  ArrowRight,
  ArrowLeft,
  Upload,
  Check,
  Info,
  AlertTriangle,
  ShieldCheck,
  Clock,
  CheckCircle,
  Camera,
  Menu,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Header } from '@/components/ui/header';

const steps = [
  {
    id: 1,
    title: 'Acesse as Configurações',
    subtitle: 'Primeiro passo para acessar seus dados',
    icon: Settings,
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: 'Centro de Contas',
    subtitle: 'Acesse as opções de dados pessoais',
    icon: UserCircle,
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: 'Selecione os Dados',
    subtitle: 'Escolha apenas os dados necessários',
    icon: CheckSquare,
    color: 'from-green-500 to-green-600',
  },
  {
    id: 4,
    title: 'Solicite o Download',
    subtitle: 'Finalize o processo de solicitação',
    icon: Download,
    color: 'from-orange-500 to-orange-600',
  },
  {
    id: 5,
    title: 'Baixe e Extraia',
    subtitle: 'Último passo para obter seus arquivos',
    icon: Mail,
    color: 'from-emerald-500 to-emerald-600',
  },
];

export default function TutorialPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    router.push('/upload');
  };

  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className='min-h-screen gradient-bg'>
      <Header
        subtitle='Tutorial Completo'
        rightContent={
          <div className='text-white text-sm hidden md:block font-medium'>
            <BookOpen className='inline w-4 h-4 mr-1' />
            Tutorial Completo
          </div>
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
            Como exportar seus dados do Instagram
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='text-white text-lg opacity-90 max-w-2xl mx-auto'
          >
            Siga este tutorial passo a passo para baixar seus dados de
            seguidores de forma segura e privada
          </motion.p>
        </div>

        {/* Progress Section */}
        <div className='mb-12'>
          <div className='flex items-center justify-between mb-6'>
            <h3 className='text-white text-xl font-semibold'>Progresso</h3>
            <Badge variant='secondary' className='bg-white/20 text-white'>
              Passo {currentStep} de {steps.length}
            </Badge>
          </div>

          <Progress value={progress} className='h-2 mb-8' />

          <div className='flex justify-between items-center'>
            {steps.map((step, index) => (
              <div key={step.id} className='flex flex-col items-center'>
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                  ${
                    currentStep === step.id
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-110'
                      : currentStep > step.id
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                      : 'bg-white/20 text-white'
                  }
                `}
                >
                  {currentStep > step.id ? (
                    <Check className='w-4 h-4' />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className='hidden md:block w-16 h-1 bg-white/20 mt-2'>
                    <div
                      className='h-full bg-gradient-to-r from-white to-blue-200 transition-all duration-700'
                      style={{ width: currentStep > step.id ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12'>
          {/* Steps Content */}
          <div>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && <StepOne />}
                {currentStep === 2 && <StepTwo />}
                {currentStep === 3 && <StepThree />}
                {currentStep === 4 && <StepFour />}
                {currentStep === 5 && <StepFive />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile Mockup */}
          <div className='lg:sticky lg:top-24'>
            <div className='flex justify-center'>
              <MockupPhone currentStep={currentStep} />
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className='flex justify-between items-center mt-12'>
          <Button
            variant='ghost'
            onClick={handlePrev}
            disabled={currentStep === 1}
            className='text-white hover:bg-white/20'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Anterior
          </Button>

          <div className='text-center text-white'>
            <p className='font-medium'>{steps[currentStep - 1].title}</p>
            <p className='text-sm opacity-70'>
              Passo {currentStep} de {steps.length}
            </p>
          </div>

          {currentStep === 5 ? (
            <Button
              onClick={handleFinish}
              className='bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
            >
              Começar Análise
              <Upload className='w-4 h-4 ml-2' />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className='bg-blue-500 hover:bg-blue-600'
            >
              Próximo
              <ArrowRight className='w-4 h-4 ml-2' />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

// Step Components (mantidos os mesmos)
function StepOne() {
  const step = steps[0];
  const Icon = step.icon;

  return (
    <Card className='p-8 shadow-2xl'>
      <div className='flex items-center mb-6'>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
        >
          <Icon className='text-white w-7 h-7' />
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>{step.title}</h3>
          <p className='text-gray-600 text-sm'>{step.subtitle}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <StepItem
          icon={Check}
          title='Abra o Instagram'
          description='Use o aplicativo ou acesse instagram.com no navegador'
        />
        <StepItem
          icon={Check}
          title='Vá para seu perfil'
          description='Toque no ícone de perfil no canto inferior direito'
        />
        <StepItem
          icon={Check}
          title='Abra o menu'
          description='Toque nas três linhas no canto superior direito'
        />
        <StepItem
          icon={ArrowRight}
          title="Selecione 'Configurações e privacidade'"
          description='Esta opção aparece no menu lateral'
          highlight
        />
      </div>

      <div className='bg-blue-50 border border-blue-200 rounded-xl p-4'>
        <div className='flex items-start space-x-3'>
          <Info className='text-blue-500 w-5 h-5 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-blue-800 font-medium text-sm'>
              💡 Dica para navegador
            </p>
            <p className='text-blue-700 text-sm mt-1'>
              No navegador web, clique no seu avatar no canto superior direito e
              selecione "Configurações".
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StepTwo() {
  const step = steps[1];
  const Icon = step.icon;

  return (
    <Card className='p-8 shadow-2xl'>
      <div className='flex items-center mb-6'>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
        >
          <Icon className='text-white w-7 h-7' />
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>{step.title}</h3>
          <p className='text-gray-600 text-sm'>{step.subtitle}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <StepItem
          icon={Check}
          title="Encontre 'Centro de Contas'"
          description='Procure esta opção na lista de configurações'
        />
        <StepItem
          icon={Check}
          title="Acesse 'Suas informações e permissões'"
          description='Esta seção contém opções de privacidade de dados'
        />
        <StepItem
          icon={ArrowRight}
          title="Clique em 'Baixar suas informações'"
          description='Aqui você poderá solicitar o download dos seus dados'
          highlight
        />
      </div>

      <div className='bg-amber-50 border border-amber-200 rounded-xl p-4'>
        <div className='flex items-start space-x-3'>
          <AlertTriangle className='text-amber-500 w-5 h-5 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-amber-800 font-medium text-sm'>
              ⚠️ Localização pode variar
            </p>
            <p className='text-amber-700 text-sm mt-1'>
              Dependendo da versão do app, essa opção pode estar em locais
              ligeiramente diferentes no menu.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StepThree() {
  const step = steps[2];
  const Icon = step.icon;

  return (
    <Card className='p-8 shadow-2xl'>
      <div className='flex items-center mb-6'>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
        >
          <Icon className='text-white w-7 h-7' />
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>{step.title}</h3>
          <p className='text-gray-600 text-sm'>{step.subtitle}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <StepItem
          icon={Check}
          title='Selecione sua conta'
          description='Se você tem múltiplas contas, escolha a desejada'
        />

        <div className='p-4 bg-gray-50 rounded-lg'>
          <p className='text-gray-800 font-medium mb-3'>
            Em "Selecionar informações", marque:
          </p>
          <div className='space-y-3'>
            <div className='flex items-center space-x-3 p-3 bg-green-100 rounded-lg border border-green-200'>
              <div className='w-5 h-5 bg-green-500 rounded flex items-center justify-center'>
                <Check className='w-3 h-3 text-white' />
              </div>
              <span className='text-gray-800 font-semibold'>
                ✅ Seguidores e seguindo
              </span>
            </div>
            <div className='flex items-center space-x-3 p-3 bg-gray-100 rounded-lg'>
              <div className='w-5 h-5 border-2 border-gray-400 rounded'></div>
              <span className='text-gray-600'>Conexões (opcional)</span>
            </div>
          </div>
        </div>

        <StepItem
          icon={ArrowRight}
          title='Configurações importantes:'
          description='Formato: JSON (recomendado) | Qualidade da mídia: Baixa (mais rápido)'
          highlight
        />
      </div>

      <div className='bg-green-50 border border-green-200 rounded-xl p-4'>
        <div className='flex items-start space-x-3'>
          <ShieldCheck className='text-green-500 w-5 h-5 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-green-800 font-medium text-sm'>
              🔒 Privacidade garantida
            </p>
            <p className='text-green-700 text-sm mt-1'>
              Estamos interessados apenas nos dados de seguidores. Não é
              necessário marcar outras opções.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StepFour() {
  const step = steps[3];
  const Icon = step.icon;

  return (
    <Card className='p-8 shadow-2xl'>
      <div className='flex items-center mb-6'>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
        >
          <Icon className='text-white w-7 h-7' />
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>{step.title}</h3>
          <p className='text-gray-600 text-sm'>{step.subtitle}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <StepItem
          icon={Check}
          title='Revise suas seleções'
          description="Certifique-se de que apenas 'Seguidores e seguindo' está marcado"
        />
        <StepItem
          icon={ArrowRight}
          title="Clique em 'Criar arquivo'"
          description='Este botão inicia o processamento dos seus dados'
          highlight
        />
        <StepItem
          icon={Clock}
          title='Aguarde a confirmação'
          description='Uma mensagem aparecerá confirmando que o arquivo será criado'
        />
      </div>

      <div className='bg-orange-50 border border-orange-200 rounded-xl p-4'>
        <div className='flex items-start space-x-3'>
          <Clock className='text-orange-500 w-5 h-5 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-orange-800 font-medium text-sm'>
              ⏱️ Tempo de processamento
            </p>
            <p className='text-orange-700 text-sm mt-1'>
              O Instagram pode levar de{' '}
              <strong>algumas horas até 14 dias</strong> para processar.
              Geralmente fica pronto em <strong>1-2 dias</strong>.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StepFive() {
  const step = steps[4];
  const Icon = step.icon;

  return (
    <Card className='p-8 shadow-2xl'>
      <div className='flex items-center mb-6'>
        <div
          className={`w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mr-4 shadow-lg`}
        >
          <Icon className='text-white w-7 h-7' />
        </div>
        <div>
          <h3 className='text-2xl font-bold text-gray-800'>{step.title}</h3>
          <p className='text-gray-600 text-sm'>{step.subtitle}</p>
        </div>
      </div>

      <div className='space-y-4 mb-8'>
        <StepItem
          icon={Check}
          title='Verifique seu e-mail'
          description='Use o e-mail cadastrado na sua conta do Instagram'
        />
        <StepItem
          icon={Check}
          title='Acesse o link do Instagram'
          description='Clique no link enviado por e-mail pelo Instagram'
        />
        <StepItem
          icon={Check}
          title='Baixe o arquivo ZIP'
          description='Faça o download do arquivo compactado para seu dispositivo'
        />
        <StepItem
          icon={ArrowRight}
          title='Extraia e localize os arquivos:'
          description='followers_and_following/ → followers.json e following.json'
          highlight
        />
      </div>

      <div className='bg-emerald-50 border border-emerald-200 rounded-xl p-4'>
        <div className='flex items-start space-x-3'>
          <CheckCircle className='text-emerald-500 w-5 h-5 flex-shrink-0 mt-0.5' />
          <div>
            <p className='text-emerald-800 font-medium text-sm'>
              🎉 Parabéns! Processo concluído
            </p>
            <p className='text-emerald-700 text-sm mt-1'>
              Agora você pode fazer upload desses dois arquivos JSON em nosso
              analisador para descobrir quem não está te seguindo de volta, seus
              seguidores mútuos e muito mais!
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StepItem({
  icon: Icon,
  title,
  description,
  highlight = false,
}: {
  icon: any;
  title: string;
  description: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex items-start space-x-4 p-4 rounded-lg ${
        highlight ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          highlight ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
        }`}
      >
        <Icon className='w-4 h-4 text-white' />
      </div>
      <div>
        <p className='text-gray-800 font-medium'>{title}</p>
        <p className='text-gray-600 text-sm'>{description}</p>
      </div>
    </div>
  );
}

function MockupPhone({ currentStep }: { currentStep: number }) {
  return (
    <motion.div
      className='bg-gradient-to-b from-gray-800 to-gray-900 rounded-[30px] p-2 shadow-2xl'
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className='bg-gradient-to-br from-purple-500 to-pink-500 rounded-[22px] overflow-hidden min-h-[400px] w-64'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className='p-6 text-white h-full'
          >
            {currentStep === 1 && <MockupScreen1 />}
            {currentStep === 2 && <MockupScreen2 />}
            {currentStep === 3 && <MockupScreen3 />}
            {currentStep === 4 && <MockupScreen4 />}
            {currentStep === 5 && <MockupScreen5 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function MockupScreen1() {
  return (
    <div>
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center space-x-2'>
          <Camera className='w-6 h-6' />
          <span className='font-semibold'>Instagram</span>
        </div>
        <Menu className='w-6 h-6' />
      </div>

      <div className='space-y-3'>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Seu Perfil</span>
        </div>
        <motion.div
          className='bg-white/20 backdrop-blur-sm rounded-lg p-3 border-2 border-white/50'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className='flex justify-between items-center'>
            <span>Configurações e privacidade</span>
            <ChevronRight className='w-4 h-4' />
          </div>
        </motion.div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Sua atividade</span>
        </div>
      </div>
    </div>
  );
}

function MockupScreen2() {
  return (
    <div>
      <div className='flex items-center mb-6'>
        <ArrowLeft className='w-6 h-6 mr-3' />
        <span className='font-semibold'>Configurações</span>
      </div>

      <div className='space-y-3'>
        <motion.div
          className='bg-white/20 backdrop-blur-sm rounded-lg p-3 border-2 border-white/50'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className='flex justify-between items-center'>
            <span>Centro de Contas</span>
            <ChevronRight className='w-4 h-4' />
          </div>
        </motion.div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Privacidade</span>
        </div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Notificações</span>
        </div>
      </div>
    </div>
  );
}

function MockupScreen3() {
  return (
    <div>
      <div className='flex items-center mb-6'>
        <ArrowLeft className='w-6 h-6 mr-3' />
        <span className='font-semibold'>Baixar informações</span>
      </div>

      <div className='space-y-3'>
        <p className='text-sm opacity-80 mb-4'>Selecione as informações:</p>
        <motion.div
          className='bg-green-400/30 backdrop-blur-sm rounded-lg p-3 border-2 border-green-400'
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className='flex items-center space-x-3'>
            <Check className='w-4 h-4 bg-green-400 rounded' />
            <span>Seguidores e seguindo</span>
          </div>
        </motion.div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Fotos e vídeos</span>
        </div>
        <div className='bg-white/10 backdrop-blur-sm rounded-lg p-3'>
          <span>Stories</span>
        </div>
      </div>
    </div>
  );
}

function MockupScreen4() {
  return (
    <div className='flex flex-col justify-center h-full'>
      <div className='text-center'>
        <motion.div
          className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4'
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Download className='w-8 h-8' />
        </motion.div>
        <h3 className='font-semibold mb-2'>Preparando arquivo</h3>
        <p className='text-sm opacity-80 mb-4'>Processando seus dados...</p>
        <div className='w-full bg-white/20 rounded-full h-1 mb-4'>
          <motion.div
            className='bg-white h-1 rounded-full'
            animate={{ width: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

function MockupScreen5() {
  return (
    <div className='flex flex-col justify-center h-full text-center'>
      <motion.div
        className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <Check className='w-8 h-8' />
      </motion.div>
      <h3 className='font-semibold mb-2'>Arquivo criado!</h3>
      <p className='text-sm opacity-80 mb-4'>Verifique seu e-mail</p>
      <div className='bg-white/20 rounded-lg p-3'>
        <div className='flex items-center space-x-2'>
          <Mail className='w-4 h-4' />
          <div className='text-left text-sm'>
            <div>E-mail enviado</div>
            <div className='opacity-60'>seu@email.com</div>
          </div>
        </div>
      </div>
    </div>
  );
}
