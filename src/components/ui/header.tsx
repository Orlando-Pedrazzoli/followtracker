'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Users, Menu, X, ChevronDown, BookOpen, Eye, HelpCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Preços', href: '/pricing' },
  ];

  const resourcesItems = [
    { 
      label: 'Tutorial', 
      href: '/tutorial', 
      icon: <BookOpen className="w-4 h-4" />, 
      description: 'Como exportar seus dados' 
    },
    { 
      label: 'Ver Exemplo', 
      href: '/sample', 
      icon: <Eye className="w-4 h-4" />, 
      description: 'Veja uma análise de exemplo' 
    },
    { 
      label: 'FAQ', 
      href: '/faq', 
      icon: <HelpCircle className="w-4 h-4" />, 
      description: 'Perguntas frequentes' 
    },
  ];

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="app-header sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group transition-all hover:scale-105 flex-shrink-0"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
                <Users className="text-white w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="text-left">
                <h1 className="text-white font-bold text-lg md:text-xl tracking-tight">
                  FollowerScan
                </h1>
                <p className="text-slate-400 text-[10px] md:text-xs hidden sm:block">
                  {subtitle}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            {showNav && (
              <nav className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'text-white bg-white/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Resources Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setResourcesOpen(!resourcesOpen)}
                    className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                      resourcesOpen || resourcesItems.some(item => isActive(item.href))
                        ? 'text-white bg-white/10' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Recursos
                    <ChevronDown 
                      className={`w-4 h-4 transition-transform duration-200 ${
                        resourcesOpen ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>

                  <AnimatePresence>
                    {resourcesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="absolute top-full right-0 mt-2 w-72 py-2 rounded-xl bg-slate-900/98 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40"
                      >
                        {resourcesItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setResourcesOpen(false)}
                            className={`flex items-start gap-3 px-4 py-3 transition-colors group ${
                              isActive(item.href)
                                ? 'bg-purple-500/10'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                              isActive(item.href)
                                ? 'bg-purple-500/30 text-purple-300'
                                : 'bg-purple-500/20 text-purple-400 group-hover:bg-purple-500/30'
                            }`}>
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-white font-medium text-sm">
                                {item.label}
                              </div>
                              <div className="text-slate-400 text-xs mt-0.5">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            )}

            {/* Right Content & Mobile Menu Button */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Right Content (Auth buttons, etc) */}
              <div className="hidden sm:flex items-center gap-2 md:gap-3">
                {rightContent}
              </div>
              
              {/* Mobile Menu Button - Always visible on mobile when showNav is true */}
              {showNav && (
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden flex items-center justify-center w-10 h-10 text-white rounded-lg hover:bg-white/10 transition-colors"
                  aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                  aria-expanded={mobileMenuOpen}
                >
                  <AnimatePresence mode="wait">
                    {mobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <X className="w-6 h-6" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <Menu className="w-6 h-6" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && showNav && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-slate-900/98 backdrop-blur-xl border-l border-white/10 z-50 lg:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="text-white font-semibold">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Menu Content */}
              <div className="p-4">
                {/* Auth Content for Mobile */}
                {rightContent && (
                  <div className="flex flex-col gap-2 pb-4 mb-4 border-b border-white/10 sm:hidden">
                    {rightContent}
                  </div>
                )}

                {/* Navigation Links */}
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        isActive(item.href)
                          ? 'bg-purple-500/20 text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Resources Section */}
                <div className="mt-6">
                  <p className="text-slate-500 text-xs uppercase tracking-wider px-4 mb-3 font-medium">
                    Recursos
                  </p>
                  <nav className="space-y-1">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                          isActive(item.href)
                            ? 'bg-purple-500/20 text-white'
                            : 'text-slate-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={`${
                          isActive(item.href) ? 'text-purple-300' : 'text-purple-400'
                        }`}>
                          {item.icon}
                        </span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">
                            {item.description}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </nav>
                </div>

                {/* Legal Links */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 px-4">
                    <Link href="/privacy" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                      Privacidade
                    </Link>
                    <Link href="/terms" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                      Termos
                    </Link>
                    <Link href="/gdpr" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                      RGPD
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}