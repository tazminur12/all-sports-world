'use client';

import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [installEvent,  setInstallEvent]  = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled,   setIsInstalled]   = useState(false);
  const [isIOS,         setIsIOS]         = useState(false);
  const [dismissed,     setDismissed]     = useState(false);

  useEffect(() => {
    // iOS detect
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    // Already installed check
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    setIsInstalled(isStandalone);

    // Already dismissed এর আগে?
    const wasDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (wasDismissed) {
      setDismissed(true);
      return;
    }

    // iOS এ beforeinstallprompt নেই — আলাদা handle করতে হয়
    if (ios && !isStandalone) {
      setIsInstallable(true);
      return;
    }

    // Android / Desktop
    const handler = (e) => {
      e.preventDefault();
      setInstallEvent(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Already installed listener
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  // Install trigger
  async function triggerInstall() {
    if (!installEvent) return false;
    installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
    }
    return outcome === 'accepted';
  }

  // Dismiss করো
  function dismiss() {
    setDismissed(true);
    localStorage.setItem('pwa-prompt-dismissed', 'true');
  }

  // Reset (দেখাতে চাইলে)
  function reset() {
    setDismissed(false);
    localStorage.removeItem('pwa-prompt-dismissed');
  }

  return {
    isInstallable,
    isInstalled,
    isIOS,
    dismissed,
    triggerInstall,
    dismiss,
    reset,
  };
}
