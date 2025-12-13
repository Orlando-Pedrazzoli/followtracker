'use client';

import { motion } from 'framer-motion';
import { Heart, Globe, Code2, Instagram, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
          {/* Brand Section */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Instagram className="w-5 h-5 text-purple-400" />
              </motion.div>
              <span className="font-bold text-lg">FollowerScan</span>
            </div>
            <p className="text-slate-400 text-sm">
              Análise privada e segura de seguidores do Instagram
            </p>
            <div className="flex items-center space-x-1 text-slate-400 text-xs">
              <Heart className="w-3 h-3 text-red-400" />
              <span>Feito com amor em Portugal</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Produto</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Início
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Preços
                </a>
              </li>
              <li>
                <a href="/tutorial" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Tutorial
                </a>
              </li>
              <li>
                <a href="/dashboard/analyze" className="text-slate-400 hover:text-white transition-colors text-sm">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400 text-sm">100% Privado</span>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Processamento Local</span>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Sem Rastreamento</span>
              </li>
              <li>
                <span className="text-slate-400 text-sm">Código Aberto</span>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div>
            <h3 className="text-white font-semibold mb-3 text-sm">Developer</h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <a
                href="https://orlandopedrazzoli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm group"
              >
                <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                orlandopedrazzoli.com
              </a>
              <a
                href="https://github.com/orlandopedrazzoli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm group"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/orlandopedrazzoli"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm group"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <Code2 className="w-4 h-4" />
              <span>v1.0.0</span>
              <span>•</span>
              <span>© {currentYear} FollowerScan</span>
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <span>Privacidade</span>
              <span>•</span>
              <span>Termos</span>
              <span>•</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Footer Minimalista - Para páginas de login/upload
export function FooterMinimal() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="text-slate-400 text-sm">
            © {currentYear} FollowerScan
          </div>
          <a
            href="https://orlandopedrazzoli.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-purple-400 transition-colors text-sm flex items-center gap-1"
          >
            <Globe className="w-3 h-3" />
            orlandopedrazzoli.com
          </a>
        </div>
      </div>
    </footer>
  );
}