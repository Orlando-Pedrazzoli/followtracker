'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Code2, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className='footer-bg mt-auto'>
      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
          {/* Logo e Nome */}
          <div className='flex items-center space-x-2 text-white'>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Instagram className='w-5 h-5' />
            </motion.div>
            <span className='font-semibold'>FollowerScan</span>
            <span className='text-white/60'>•</span>
            <span className='text-sm text-white/80'>Análise de Seguidores</span>
          </div>

          {/* Créditos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className='flex items-center space-x-2 text-white text-sm'
          >
            <span className='text-white/80'>Desenvolvido por</span>

            <a
              href='https://orlandopedrazzoli.com'
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold footer-link flex items-center gap-1 group'
            >
              <Globe className='w-4 h-4 group-hover:rotate-12 transition-transform' />
              orlandopedrazzoli.com
            </a>
          </motion.div>

          {/* Ano e Versão */}
          <div className='flex items-center space-x-2 text-white/60 text-sm'>
            <Code2 className='w-4 h-4' />
            <span>v1.0.0</span>
            <span>•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>

        {/* Linha adicional para mobile */}
        <div className='mt-4 pt-4 border-t border-white/10 text-center md:hidden'>
          <p className='text-xs text-white/60'>
            100% Privado • Processamento Local • Sem Rastreamento
          </p>
        </div>
      </div>
    </footer>
  );
}

// Footer minimalista alternativo
export function FooterMinimal() {
  return (
    <footer className='footer-bg'>
      <div className='container mx-auto px-4 py-4'>
        <div className='text-center text-white text-sm'>
          <span className='text-white/70'>
            © {new Date().getFullYear()} FollowerScan •{' '}
          </span>
          <a
            href='https://orlandopedrazzoli.com'
            target='_blank'
            rel='noopener noreferrer'
            className='footer-link'
          >
            orlandopedrazzoli.com
          </a>
        </div>
      </div>
    </footer>
  );
}
