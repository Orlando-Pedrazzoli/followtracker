'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, BookOpen, Eye, HelpCircle, Sun, Moon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from '@/components/theme-provider';

interface HeaderProps {
  subtitle?: string;
  rightContent?: React.ReactNode;
  showNav?: boolean;
}

export function Header({
  subtitle = 'Análise de Seguidores Instagram',
  rightContent,
  showNav = true,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Preços', href: '/pricing' },
  ];

  const resourcesItems = [
    { label: 'Tutorial', href: '/tutorial', icon: <BookOpen className="w-4 h-4" />, description: 'Como exportar seus dados' },
    { label: 'Ver Exemplo', href: '/sample', icon: <Eye className="w-4 h-4" />, description: 'Veja uma análise de exemplo' },
    { label: 'FAQ', href: '/faq', icon: <HelpCircle className="w-4 h-4" />, description: 'Perguntas frequentes' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const isDark = theme === 'dark';

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDark
            ? 'bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/10'
            : 'bg-white/95 backdrop-blur-xl border-b border-purple-500/10 shadow-lg shadow-purple-500/5'
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group transition-all hover:scale-105 flex-shrink-0">
              <Image 
                src="/favicon-insta.svg" 
                alt="FollowerScan" 
                width={40} 
                height={40}
                className="w-9 h-9 md:w-10 md:h-10"
              />
              <div className="text-left">
                <h1 className={`font-bold text-lg md:text-xl tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>FollowerScan</h1>
                <p className={`text-[10px] md:text-xs hidden sm:block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{subtitle}</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {showNav && (
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.href) 
                        ? isDark ? 'text-white bg-white/10' : 'text-slate-900 bg-slate-100'
                        : isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}>
                    {item.label}
                  </Link>
                ))}

                {/* Resources Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      resourcesOpen 
                        ? isDark ? 'text-white bg-white/10' : 'text-slate-900 bg-slate-100'
                        : isDark ? 'text-slate-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}>
                    Recursos
                    <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className={`absolute top-full right-0 mt-2 w-72 py-2 rounded-xl border shadow-2xl ${
                          isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
                        }`}>
                        {resourcesItems.map((item) => (
                          <Link key={item.href} href={item.href} onClick={() => setResourcesOpen(false)}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                              isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                            }`}>
                            <div className="w-9 h-9 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                              {item.icon}
                            </div>
                            <div>
                              <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.label}</div>
                              <div className="text-slate-400 text-xs mt-0.5">{item.description}</div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <button onClick={toggleTheme}
                  className={`ml-2 p-2 rounded-lg transition-all ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Mudar tema">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </nav>
            )}

            {/* Right Content & Mobile */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Theme Toggle Mobile */}
              {showNav && (
                <button onClick={toggleTheme}
                  className={`lg:hidden p-2 rounded-lg transition-all ${
                    isDark ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Mudar tema">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              )}

              <div className="hidden sm:flex items-center gap-2 md:gap-3">{rightContent}</div>
              
              {/* Mobile Menu Button */}
              {showNav && (
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg ${
                    isDark ? 'text-white hover:bg-white/10' : 'text-slate-900 hover:bg-slate-100'
                  }`}
                  aria-label="Menu">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && showNav && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)} />

            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] border-l z-50 lg:hidden overflow-y-auto ${
                isDark ? 'bg-slate-900 border-white/10' : 'bg-white border-slate-200'
              }`}>
              <div className={`flex items-center justify-between p-4 border-b ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Menu</span>
                <button onClick={() => setMobileMenuOpen(false)} className={`w-10 h-10 flex items-center justify-center ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4">
                {rightContent && <div className="flex flex-col gap-2 pb-4 mb-4 border-b border-white/10 sm:hidden">{rightContent}</div>}

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive(item.href) 
                          ? 'bg-purple-500/20 text-white' 
                          : isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
                      }`}>
                      {item.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6">
                  <p className="text-slate-500 text-xs uppercase tracking-wider px-4 mb-3 font-medium">Recursos</p>
                  <nav className="space-y-1">
                    {resourcesItems.map((item) => (
                      <Link key={item.href} href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isDark ? 'text-slate-300 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-50'
                        }`}>
                        <span className="text-purple-400">{item.icon}</span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{item.description}</div>
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className={`mt-6 pt-6 border-t flex flex-wrap gap-x-4 gap-y-2 px-4 ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <Link href="/privacy" className="text-slate-500 text-sm hover:text-slate-300">Privacidade</Link>
                  <Link href="/terms" className="text-slate-500 text-sm hover:text-slate-300">Termos</Link>
                  <Link href="/gdpr" className="text-slate-500 text-sm hover:text-slate-300">RGPD</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}