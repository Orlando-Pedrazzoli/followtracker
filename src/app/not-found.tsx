import { Home, Search, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  const suggestions = [
    { label: 'Página Inicial', href: '/', icon: 'home' },
    { label: 'Tutorial', href: '/tutorial', icon: 'search' },
    { label: 'Preços', href: '/pricing', icon: 'search' },
    { label: 'FAQ', href: '/faq', icon: 'help' },
  ];

  return (
    <div className="min-h-screen app-bg-animated flex items-center justify-center">
      <div className="bg-decorations" />
      <div className="bg-grid" />

      <main className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          {/* 404 */}
          <div className="mb-8">
            <div className="text-[150px] md:text-[200px] font-bold text-gradient leading-none">
              404
            </div>
          </div>

          {/* Message */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Página não encontrada
            </h1>
            <p className="text-slate-400 text-lg mb-8 max-w-md mx-auto">
              Ops! Parece que esta página não existe ou foi movida.
              Não se preocupe, vamos te ajudar a encontrar o caminho.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-primary text-white font-medium"
            >
              <Home className="w-4 h-4" />
              Ir para Início
            </Link>
          </div>

          {/* Suggestions */}
          <div>
            <p className="text-slate-500 text-sm mb-4">
              Talvez você estivesse procurando:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {suggestions.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white hover:border-purple-500/50 transition-all"
                >
                  {item.icon === 'home' && <Home className="w-4 h-4" />}
                  {item.icon === 'search' && <Search className="w-4 h-4" />}
                  {item.icon === 'help' && <HelpCircle className="w-4 h-4" />}
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Fun Element */}
          <p className="text-slate-600 text-sm mt-12">
            🔍 Dica: Se você acha que isso é um erro, entre em contacto connosco.
          </p>
        </div>
      </main>
    </div>
  );
}