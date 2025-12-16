'use client';

import { Shield, Lock, Globe, Github, Linkedin, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Payment methods configuration - paths match files in /public folder
const paymentMethods = [
  { name: 'Visa', src: '/visa-alt.svg' },
  { name: 'Mastercard', src: '/mastercard-alt.svg' },
  { name: 'American Express', src: '/american-express.svg' },
  { name: 'PayPal', src: '/paypal.svg' },
  { name: 'Apple Pay', src: '/apple-pay.svg' },
  { name: 'Google Pay', src: '/google-pay-alt.svg' },
  { name: 'Elo', src: '/elo.svg' },
  { name: 'Diners', src: '/diners.svg' },
  { name: 'Amazon Pay', src: '/amazon-pay.svg' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    produto: [
      { label: 'Funcionalidades', href: '/#features' },
      { label: 'Preços', href: '/pricing' },
      { label: 'Tutorial', href: '/tutorial' },
      { label: 'Ver Exemplo', href: '/sample' },
    ],
    suporte: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Como Funciona', href: '/tutorial' },
      { label: 'Contacto', href: 'mailto:suporte@followerscan.com' },
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
            <Link href="/" className="flex items-center space-x-2 text-white group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4 text-white" />
              </div>
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
              <p className="text-slate-400 text-xs mb-4">Pagamentos seguros processados por Stripe</p>
              <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
                {paymentMethods.map((method) => (
                  <div
                    key={method.name}
                    className="h-8 w-12 bg-white rounded-md flex items-center justify-center p-1.5 hover:scale-105 transition-transform"
                    title={method.name}
                  >
                    <Image
                      src={method.src}
                      alt={method.name}
                      width={40}
                      height={24}
                      className="object-contain h-full w-full"
                    />
                  </div>
                ))}
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
            <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-pink-500 rounded flex items-center justify-center">
              <Users className="w-3 h-3 text-white" />
            </div>
            <span>© {currentYear} FollowerScan</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacidade
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Termos
            </Link>
            <Link href="/faq" className="hover:text-slate-300 transition-colors">
              FAQ
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