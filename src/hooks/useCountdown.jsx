'use client';
import { useState, useEffect } from 'react';
import { getCountdown } from '@/utils/timeUtils';

export function useCountdown(targetDate) {
  /** null until after mount so SSR + first client paint match (no Date.now() drift). */
  const [snapshot, setSnapshot] = useState(null);

  useEffect(() => {
    setSnapshot(getCountdown(targetDate));
    const timer = setInterval(() => {
      setSnapshot(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (snapshot === null) {
    return {
      ready: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isOver: false,
    };
  }

  return { ready: true, ...snapshot };
}
