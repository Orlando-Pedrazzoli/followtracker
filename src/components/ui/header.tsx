'use client';

import { useRouter } from 'next/navigation';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
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

  return (
    <header className="app-header sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-3 group transition-all hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-shadow">
              <Users className="text-white w-5 h-5" />
            </div>
            <div className="text-left">
              <h1 className="text-white font-bold text-xl tracking-tight">
                FollowerScan
              </h1>
              {subtitle && (
                <p className="text-slate-400 text-xs">{subtitle}</p>
              )}
            </div>
          </button>

          {/* Desktop Navigation */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 rounded-lg hover:bg-white/5"
                >
                  {item.label}
                </button>
              ))}

              {/* Resources Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className={`flex items-center gap-1 text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                    resourcesOpen 
                      ? 'text-white bg-white/10' 
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Recursos
                  <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {resourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-64 py-2 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/20"
                    >
                      {resourcesItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setResourcesOpen(false)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                        >
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500/30 transition-colors flex-shrink-0 mt-0.5">
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-white font-medium text-sm">{item.label}</div>
                            <div className="text-slate-400 text-xs">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          )}

          {/* Right Content */}
          <div className="flex items-center gap-3">
            {rightContent}
            
            {/* Mobile Menu Button */}
            {showNav && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && showNav && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => {
                      router.push(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="text-slate-300 hover:text-white transition-colors text-left py-2 px-3 hover:bg-white/5 rounded-lg"
                  >
                    {item.label}
                  </button>
                ))}
                
                {/* Mobile Resources Section */}
                <div className="pt-2 mt-2 border-t border-white/10">
                  <p className="text-slate-500 text-xs uppercase tracking-wider px-3 py-2">Recursos</p>
                  {resourcesItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => {
                        router.push(item.href);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full text-slate-300 hover:text-white transition-colors text-left py-2 px-3 hover:bg-white/5 rounded-lg"
                    >
                      <span className="text-purple-400">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}