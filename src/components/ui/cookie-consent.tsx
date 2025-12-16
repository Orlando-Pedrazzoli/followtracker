'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Settings, Shield, ChevronDown } from 'lucide-react';
import Link from 'next/link';

type CookieConsent = {
  essential: boolean;
  analytics: boolean;
  preferences: boolean;
  timestamp: number;
};

const CONSENT_KEY = 'followerscan-cookie-consent';

export function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true, // Always required
    analytics: false,
    preferences: false,
    timestamp: 0,
  });

  // Check if consent was already given
  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent) as CookieConsent;
        // Check if consent is older than 1 year (GDPR requirement)
        const oneYear = 365 * 24 * 60 * 60 * 1000;
        if (Date.now() - parsed.timestamp < oneYear) {
          setConsent(parsed);
          setIsVisible(false);
          return;
        }
      } catch {
        // Invalid stored consent, show banner
      }
    }
    
    // Small delay to avoid flash on page load
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = { ...newConsent, timestamp: Date.now() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentWithTimestamp));
    setConsent(consentWithTimestamp);
    setIsVisible(false);
    
    // Here you would typically trigger/block analytics based on consent
    if (newConsent.analytics) {
      // Enable analytics (e.g., Google Analytics, Vercel Analytics)
      console.log('Analytics enabled');
    }
  };

  const acceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      preferences: true,
      timestamp: Date.now(),
    });
  };

  const acceptEssential = () => {
    saveConsent({
      essential: true,
      analytics: false,
      preferences: false,
      timestamp: Date.now(),
    });
  };

  const saveCustom = () => {
    saveConsent(consent);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop for mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] sm:hidden"
            onClick={() => {}} // Prevent closing by clicking backdrop
          />

          {/* Banner */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[101] p-4 sm:p-6"
          >
            <div className="max-w-4xl mx-auto">
              <div className="bg-slate-900/98 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
                {/* Main Content */}
                <div className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="hidden sm:flex w-12 h-12 rounded-xl bg-purple-500/20 items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-purple-400" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Cookie className="w-5 h-5 text-purple-400 sm:hidden" />
                        <h3 className="text-white font-semibold text-lg">
                          Usamos Cookies
                        </h3>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Utilizamos cookies para melhorar sua experiência. Os cookies essenciais 
                        são necessários para o funcionamento do site. Você pode personalizar 
                        suas preferências ou aceitar todos.{' '}
                        <Link 
                          href="/cookies" 
                          className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
                        >
                          Saiba mais
                        </Link>
                      </p>

                      {/* Privacy Note */}
                      <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                        <Shield className="w-3.5 h-3.5 text-green-400" />
                        <span>
                          Seus dados do Instagram são processados localmente e nunca são armazenados em cookies.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {showDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                          {/* Essential Cookies */}
                          <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium text-sm">
                                  Cookies Essenciais
                                </span>
                                <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/20 text-green-400 font-medium">
                                  Obrigatório
                                </span>
                              </div>
                              <p className="text-slate-500 text-xs mt-1">
                                Autenticação, segurança e funcionamento básico
                              </p>
                            </div>
                            <div className="w-12 h-6 bg-green-500/30 rounded-full flex items-center justify-end px-1">
                              <div className="w-4 h-4 bg-green-400 rounded-full" />
                            </div>
                          </div>

                          {/* Analytics Cookies */}
                          <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
                            <div className="flex-1">
                              <span className="text-white font-medium text-sm">
                                Cookies de Análise
                              </span>
                              <p className="text-slate-500 text-xs mt-1">
                                Nos ajudam a entender como você usa o site
                              </p>
                            </div>
                            <button
                              onClick={() => setConsent(c => ({ ...c, analytics: !c.analytics }))}
                              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                consent.analytics ? 'bg-purple-500 justify-end' : 'bg-slate-700 justify-start'
                              }`}
                            >
                              <div className="w-4 h-4 bg-white rounded-full shadow" />
                            </button>
                          </label>

                          {/* Preference Cookies */}
                          <label className="flex items-center justify-between p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/[0.07] transition-colors">
                            <div className="flex-1">
                              <span className="text-white font-medium text-sm">
                                Cookies de Preferências
                              </span>
                              <p className="text-slate-500 text-xs mt-1">
                                Guardam suas preferências (tema, idioma)
                              </p>
                            </div>
                            <button
                              onClick={() => setConsent(c => ({ ...c, preferences: !c.preferences }))}
                              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                                consent.preferences ? 'bg-purple-500 justify-end' : 'bg-slate-700 justify-start'
                              }`}
                            >
                              <div className="w-4 h-4 bg-white rounded-full shadow" />
                            </button>
                          </label>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4 pt-4 border-t border-white/10">
                    {/* Customize Button */}
                    <button
                      onClick={() => setShowDetails(!showDetails)}
                      className="flex items-center justify-center gap-2 px-4 py-2.5 text-slate-400 hover:text-white text-sm font-medium transition-colors order-3 sm:order-1"
                    >
                      <Settings className="w-4 h-4" />
                      <span>{showDetails ? 'Ocultar Opções' : 'Personalizar'}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                    </button>

                    <div className="flex-1" />

                    {/* Reject / Essential Only */}
                    <button
                      onClick={acceptEssential}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-medium transition-colors order-2"
                    >
                      Apenas Essenciais
                    </button>

                    {/* Accept All */}
                    {showDetails ? (
                      <button
                        onClick={saveCustom}
                        className="px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-medium order-1 sm:order-3"
                      >
                        Guardar Preferências
                      </button>
                    ) : (
                      <button
                        onClick={acceptAll}
                        className="px-5 py-2.5 rounded-xl btn-primary text-white text-sm font-medium order-1 sm:order-3"
                      >
                        Aceitar Todos
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to check cookie consent status
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    const storedConsent = localStorage.getItem(CONSENT_KEY);
    if (storedConsent) {
      try {
        setConsent(JSON.parse(storedConsent));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  return consent;
}

// Function to reset consent (useful for testing or settings page)
export function resetCookieConsent() {
  localStorage.removeItem(CONSENT_KEY);
  window.location.reload();
}