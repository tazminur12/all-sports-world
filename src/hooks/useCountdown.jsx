'use client';
import { useState, useEffect } from 'react';
import { getCountdown } from '@/utils/timeUtils';

export function useCountdown(targetDate) {
  const [time, setTime] = useState(getCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCountdown(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return time;
}
