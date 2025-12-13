'use client';

import { useRouter } from 'next/navigation';
import { Users, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Preços', href: '/pricing' },
    { label: 'Tutorial', href: '/tutorial' },
  ];

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
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => router.push(item.href)}
                  className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                >
                  {item.label}
                </button>
              ))}
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
              <div className="flex flex-col gap-3">
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
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}