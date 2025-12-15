'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Globe, Instagram, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

// Payment Icons as SVG components for reliability
const VisaIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#1A1F71"/>
    <path d="M19.5 31H16.5L18.5 17H21.5L19.5 31Z" fill="white"/>
    <path d="M32 17L29.5 26.5L29 24L28 17.5C28 17.5 27.8 17 27 17H23L23 17.3C23 17.3 24 17.5 25.2 18.2L28 31H31.2L35.5 17H32Z" fill="white"/>
    <path d="M14 17L10.5 26.5L10 24L9 17.5C9 17.5 8.8 17 8 17H4L4 17.3C4 17.3 5.5 17.6 7 18.5C8.3 19.3 8.7 20 9 21L11.5 31H14.7L19 17H14Z" fill="white"/>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#F5F5F5"/>
    <circle cx="19" cy="24" r="10" fill="#EB001B"/>
    <circle cx="29" cy="24" r="10" fill="#F79E1B"/>
    <path d="M24 17.5C25.8 19 27 21.3 27 24C27 26.7 25.8 29 24 30.5C22.2 29 21 26.7 21 24C21 21.3 22.2 19 24 17.5Z" fill="#FF5F00"/>
  </svg>
);

const AmexIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#006FCF"/>
    <path d="M8 20H11L12 22L13 20H16V28H13.5V23L12 26H11L9.5 23V28H7V20H8ZM18 20H24V22H20.5V23H24V25H20.5V26H24V28H18V20ZM26 20H29L31 24L33 20H36L32 28H30L26 20ZM38 20H44V22H40.5V23H44V25H40.5V26H44V28H38V20Z" fill="white"/>
  </svg>
);

const PaypalIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#F5F5F5"/>
    <path d="M32.5 14C31 12.5 28.5 12 25.5 12H17.5C16.8 12 16.2 12.5 16.1 13.2L13 33.5C13 34 13.3 34.5 13.8 34.5H18.5L17.8 38.5C17.7 38.9 18 39.3 18.4 39.3H22.3C22.9 39.3 23.4 38.9 23.5 38.3L23.6 38L24.5 32.5L24.6 32.1C24.7 31.5 25.2 31.1 25.8 31.1H26.5C30.5 31.1 33.5 29.5 34.5 24.8C35 22.8 34.8 21.1 33.7 19.9" fill="#003087"/>
    <path d="M32.5 14C31 12.5 28.5 12 25.5 12H17.5C16.8 12 16.2 12.5 16.1 13.2L13 33.5C13 34 13.3 34.5 13.8 34.5H18.5L19.8 26L19.7 26.4C19.8 25.7 20.4 25.2 21.1 25.2H23.5C28.1 25.2 31.6 23.3 32.7 17.8C32.7 17.5 32.8 17.2 32.8 17C32.6 15.9 32.5 14 32.5 14Z" fill="#002F6C"/>
    <path d="M21.7 17C21.8 16.6 22.1 16.3 22.4 16.1C22.6 16 22.8 16 23 16H28.5C29.2 16 29.8 16.1 30.3 16.2C30.5 16.2 30.6 16.3 30.8 16.3C31 16.4 31.1 16.4 31.3 16.5C31.4 16.5 31.4 16.5 31.5 16.6C31.9 16.8 32.2 17 32.5 17.3C32.8 15 32.5 13.4 31.3 12.1C30 10.6 27.6 10 24.5 10H15.5C14.6 10 13.9 10.6 13.7 11.5L10 35.2C10 35.9 10.4 36.5 11.1 36.5H17L18.5 26.5L21.7 17Z" fill="#009CDE"/>
  </svg>
);

const StripeIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#635BFF"/>
    <path d="M22.5 19.5C22.5 18.5 23.3 18 24.8 18C27 18 29.8 18.7 32 19.8V14.3C29.6 13.3 27.2 13 24.8 13C19.8 13 16.5 15.7 16.5 20C16.5 27 26 25.7 26 29C26 30.2 25 30.7 23.4 30.7C21 30.7 17.9 29.7 15.5 28.4V34C18.1 35.2 20.8 35.7 23.4 35.7C28.5 35.7 32 33.1 32 28.7C32 21 22.5 22.5 22.5 19.5Z" fill="white"/>
  </svg>
);

const ApplePayIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#000"/>
    <path d="M15.5 18.5C16.2 17.6 16.6 16.4 16.5 15.2C15.4 15.3 14.1 16 13.3 16.9C12.6 17.7 12.1 18.9 12.2 20.1C13.4 20.2 14.7 19.4 15.5 18.5Z" fill="white"/>
    <path d="M16.4 20.4C14.6 20.3 13.1 21.4 12.2 21.4C11.3 21.4 10 20.5 8.6 20.5C6.7 20.5 4.9 21.6 4 23.4C2 27 3.5 32.4 5.4 35C6.3 36.3 7.4 37.7 8.8 37.7C10.2 37.6 10.7 36.8 12.4 36.8C14 36.8 14.5 37.7 16 37.6C17.5 37.6 18.5 36.3 19.4 35C20.4 33.5 20.8 32.1 20.9 32C20.8 32 17.6 30.7 17.5 27C17.5 23.8 20 22.3 20.1 22.2C18.4 19.7 15.7 20.4 16.4 20.4Z" fill="white"/>
    <path d="M28 16H31C33.8 16 35.5 17.8 35.5 20.7C35.5 23.6 33.7 25.4 30.9 25.4H28.8V30H26V16H28ZM28.8 18.2V23.2H30.5C32.2 23.2 33.2 22.2 33.2 20.7C33.2 19.2 32.2 18.2 30.5 18.2H28.8Z" fill="white"/>
    <path d="M36.5 27.5C36.5 25.6 38 24.4 40.6 24.3L43.5 24.1V23.2C43.5 22 42.7 21.3 41.3 21.3C40 21.3 39.2 21.9 39 22.9H36.8C36.9 21 38.6 19.3 41.4 19.3C44.2 19.3 45.9 20.9 45.9 23.3V30H43.7V28.2H43.6C43 29.4 41.7 30.2 40.2 30.2C38.1 30.2 36.5 28.9 36.5 27.5ZM43.5 26.5V25.6L40.9 25.8C39.6 25.9 38.9 26.4 38.9 27.3C38.9 28.2 39.7 28.8 40.8 28.8C42.3 28.8 43.5 27.8 43.5 26.5Z" fill="white"/>
  </svg>
);

const GooglePayIcon = () => (
  <svg viewBox="0 0 48 48" className="h-8 w-auto" fill="none">
    <rect width="48" height="48" rx="6" fill="#F5F5F5"/>
    <path d="M24 20.5V27.5H31.2C30.8 29.5 29.5 31.2 27.5 32.3L32.5 36.2C35.5 33.5 37.2 29.5 37.2 24.8C37.2 23.5 37.1 22.3 36.9 21.2H24V20.5Z" fill="#4285F4"/>
    <path d="M13.6 26.5L12.3 27.5L8.5 30.5C11 35.5 16.2 39 22.2 39C26.7 39 30.5 37.5 33.2 34.9L28.2 31C26.9 31.9 25.2 32.5 23 32.5C18.6 32.5 14.9 29.5 13.6 25.5L13.6 26.5Z" fill="#34A853"/>
    <path d="M8.5 17.5C7.5 19.4 7 21.6 7 24C7 26.4 7.5 28.6 8.5 30.5C8.5 30.5 13.6 25.5 13.6 25.5C13.2 24.4 13 23.2 13 24C13 22.8 13.2 21.6 13.6 20.5L8.5 17.5Z" fill="#FBBC05"/>
    <path d="M23 15.5C25.5 15.5 27.7 16.4 29.4 18L33.4 14C30.5 11.3 26.7 9.5 23 9.5C16.2 9.5 10.2 13.5 8.5 18L13.6 22C14.9 18 18.6 15.5 23 15.5Z" fill="#EA4335"/>
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produto: [
      { label: 'Funcionalidades', href: '/#features' },
      { label: 'Preços', href: '/pricing' },
      { label: 'Tutorial', href: '/tutorial' },
      { label: 'Dashboard', href: '/dashboard/analyze' },
    ],
    suporte: [
      { label: 'Central de Ajuda', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contacto', href: 'mailto:suporte@followerscan.com' },
      { label: 'Status', href: '/status' },
    ],
    legal: [
      { label: 'Privacidade', href: '/privacy' },
      { label: 'Termos de Uso', href: '/terms' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'RGPD', href: '/gdpr' },
    ],
  };

  return (
    <footer className="bg-slate-950 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-white">
              <Instagram className="w-6 h-6 text-purple-400" />
              <span className="font-bold text-xl">FollowerScan</span>
            </Link>
            <p className="text-slate-400 text-sm max-w-sm">
              A ferramenta mais segura para análise de seguidores do Instagram. 
              Processamento 100% local, sem acesso às suas credenciais.
            </p>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Shield className="w-4 h-4 text-green-400" />
                <span>Dados Protegidos</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Lock className="w-4 h-4 text-green-400" />
                <span>SSL Seguro</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/orlandopedrazzoli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/orlandopedrazzoli"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@followerscan.com"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Produto
            </h3>
            <ul className="space-y-3">
              {footerLinks.produto.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Suporte
            </h3>
            <ul className="space-y-3">
              {footerLinks.suporte.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="border-t border-white/10 pt-8 pb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-slate-400 text-xs mb-3">Pagamentos seguros processados por</p>
              <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start">
                <StripeIcon />
                <VisaIcon />
                <MastercardIcon />
                <AmexIcon />
                <PaypalIcon />
                <ApplePayIcon />
                <GooglePayIcon />
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <Lock className="w-4 h-4 text-green-400" />
              <span className="text-green-400 text-xs font-medium">Pagamento 100% Seguro</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-slate-500 text-sm">
              © {currentYear} FollowerScan. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <a
                href="https://orlandopedrazzoli.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-slate-300 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Desenvolvido por Orlando Pedrazzoli</span>
              </a>
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
    <footer className="bg-slate-950/50 border-t border-white/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Instagram className="w-4 h-4 text-purple-400" />
            <span>© {currentYear} FollowerScan</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Termos
            </Link>
            <a
              href="https://orlandopedrazzoli.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-slate-300 transition-colors"
            >
              <Globe className="w-3 h-3" />
              orlandopedrazzoli.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}