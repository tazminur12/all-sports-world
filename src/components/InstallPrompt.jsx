'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Globe, Share, Plus } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';

// ── iOS Instructions Modal ────────────────────
function IOSInstructions({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center
                 justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 glass-dark rounded-3xl border border-white/10
                   p-6 w-full max-w-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accentGreen
                            flex items-center justify-center">
              <Globe className="w-5 h-5 text-bgPrimary" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">All Sports World</p>
              <p className="text-textSecondary text-xs">allsportsworld.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full glass flex items-center
                       justify-center text-textSecondary hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-white font-semibold text-sm mb-5">
          iPhone / iPad এ install করুন:
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-4">
          {[
            {
              step: 1,
              icon: Share,
              text: 'নিচের Safari share button এ tap করুন',
              color: 'text-accentBlue',
              bg:   'bg-accentBlue/10',
            },
            {
              step: 2,
              icon: Plus,
              text: '"Add to Home Screen" এ tap করুন',
              color: 'text-accentGreen',
              bg:   'bg-accentGreen/10',
            },
            {
              step: 3,
              icon: Download,
              text: '"Add" button এ tap করুন — done!',
              color: 'text-yellow-400',
              bg:   'bg-yellow-400/10',
            },
          ].map(({ step, icon: Icon, text, color, bg }) => (
            <div key={step} className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center
                              justify-center shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-textSecondary">
                  {step}.
                </span>
                <span className="text-sm text-white">{text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow indicator for Safari bottom bar */}
        <div className="mt-5 flex justify-center">
          <div className="flex flex-col items-center gap-1 text-textSecondary">
            <div className="w-px h-6 bg-accentBlue/50" />
            <div className="w-2 h-2 border-b-2 border-r-2 border-accentBlue/50
                            rotate-45 -mt-1" />
            <span className="text-[10px] tracking-widest">SAFARI SHARE BUTTON</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Install Prompt ───────────────────────
export default function InstallPrompt() {
  const {
    isInstallable,
    isInstalled,
    isIOS,
    dismissed,
    triggerInstall,
    dismiss,
  } = usePWAInstall();

  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installing,   setInstalling]   = useState(false);
  const [mounted,      setMounted]      = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // দেখানোর condition
  const shouldShow =
    mounted       &&
    isInstallable &&
    !isInstalled  &&
    !dismissed;

  if (!shouldShow) return null;

  async function handleInstall() {
    if (isIOS) {
      setShowIOSModal(true);
      return;
    }
    setInstalling(true);
    await triggerInstall();
    setInstalling(false);
  }

  return (
    <>
      {/* ── Bottom Popup Banner ── */}
      <AnimatePresence>
        <motion.div
          key="install-prompt"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{ y: 120,    opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 2 }}
          className="fixed bottom-4 left-4 right-4 z-50
                     sm:left-auto sm:right-6 sm:bottom-6 sm:w-[360px]"
        >
          <div className="relative glass-dark rounded-2xl border border-accentGreen/25
                          overflow-hidden shadow-neon-green/20 shadow-2xl">

            {/* Top glow line */}
            <div className="absolute top-0 left-0 right-0 h-0.5
                            bg-gradient-to-r from-transparent
                            via-accentGreen to-transparent" />

            <div className="p-4">
              <div className="flex items-start gap-4">

                {/* App Icon */}
                <div className="w-14 h-14 rounded-2xl bg-accentGreen
                                flex items-center justify-center
                                shadow-neon-green shrink-0">
                  <Globe className="w-7 h-7 text-bgPrimary" strokeWidth={2.5} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-sm">
                      All Sports World
                    </p>
                    <button
                      onClick={dismiss}
                      className="w-6 h-6 rounded-full flex items-center
                                 justify-center text-textSecondary
                                 hover:text-white hover:bg-white/10
                                 transition-all duration-200 shrink-0 ml-2"
                      aria-label="Dismiss"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-textSecondary text-xs mt-0.5 leading-relaxed">
                    {isIOS
                      ? 'Add to your Home Screen — works offline too.'
                      : 'Install as an app — faster and works offline.'}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {['⚡ Fast', '📴 Offline', '🔔 Alerts', '📱 App Feel'].map((f) => (
                      <span
                        key={f}
                        className="text-[10px] px-2 py-0.5 rounded-full
                                   bg-white/5 text-textSecondary/80
                                   border border-white/5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleInstall}
                  disabled={installing}
                  className="flex-1 flex items-center justify-center gap-2
                             bg-accentGreen text-bgPrimary rounded-xl
                             py-2.5 text-xs font-bold
                             hover:shadow-neon-green hover:scale-[1.02]
                             active:scale-[0.98]
                             transition-all duration-200
                             disabled:opacity-60"
                >
                  {installing ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-bgPrimary/30
                                      border-t-bgPrimary rounded-full animate-spin" />
                      Installing...
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      {isIOS ? 'How to Install' : 'Install App'}
                    </>
                  )}
                </button>

                <button
                  onClick={dismiss}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium
                             text-textSecondary glass border border-white/10
                             hover:text-white hover:border-white/20
                             transition-all duration-200"
                >
                  Not now
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ── iOS Instructions Modal ── */}
      <AnimatePresence>
        {showIOSModal && (
          <IOSInstructions onClose={() => setShowIOSModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
