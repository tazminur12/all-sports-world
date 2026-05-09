'use client';

import { useState, useEffect } from 'react';
import { toLocalTime } from '@/utils/timeUtils';

export function useLocalTime(isoString) {
  const [mounted,   setMounted]   = useState(false);
  const [localTime, setLocalTime] = useState({
    dateStr: '',
    timeStr: '',
    tzAbbr:  '',
  });

  // ✅ Step 1: mount detect koro
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Step 2: mounted holar pore shudhu local time set koro
  useEffect(() => {
    if (!mounted || !isoString) return;

    try {
      setLocalTime(toLocalTime(isoString));
    } catch {
      // invalid date hole crash korbe na
      setLocalTime({ dateStr: '', timeStr: '', tzAbbr: '' });
    }
  }, [isoString, mounted]);

  return { ...localTime, mounted };
}
