'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { transformEvent } from '@/utils/sportApiTransformer';
import mockData from '../data/livescore.json';

const REFRESH_INTERVAL = 30_000; // 30 seconds
const SPORTS_MAP = {
  football:    'Football',
  basketball:  'Basketball',
  tennis:      'Tennis',
  cricket:     'Cricket',
  'ice-hockey':'Ice Hockey',
};

export function useLiveScores() {
  const [scores,     setScores]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [usingMock,  setUsingMock]  = useState(false);
  const timerRef = useRef(null);

  const fetchScores = useCallback(async (background = false) => {
    if (background) setIsUpdating(true);
    else            setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/livescore/all', {
        cache: 'no-store',
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const json = await res.json();
      if (!json.success && !json.data) throw new Error('Invalid response');

      // Transform all sports
      const transformed = [];

      Object.entries(json.data || {}).forEach(([sportSlug, events]) => {
        (events || []).forEach((event) => {
          try {
            const match = transformEvent(event, sportSlug);
            if (match) transformed.push(match);
          } catch (e) {
            // Skip malformed events
          }
        });
      });

      if (transformed.length === 0) {
        // No data today → show mock
        setScores(mockData);
        setUsingMock(true);
      } else {
        // Sort: live first, then upcoming, then finished
        const sorted = transformed.sort((a, b) => {
          const order = { live: 0, upcoming: 1, finished: 2 };
          return (order[a.status] ?? 3) - (order[b.status] ?? 3);
        });
        setScores(sorted);
        setUsingMock(false);
      }

      setLastUpdate(new Date());

    } catch (err) {
      console.error('[useLiveScores]', err.message);
      setError(err.message);
      setScores(mockData);
      setUsingMock(true);
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchScores(false);
  }, [fetchScores]);

  // Auto-refresh
  useEffect(() => {
    timerRef.current = setInterval(() => fetchScores(true), REFRESH_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [fetchScores]);

  const liveCount     = scores.filter((s) => s.status === 'live').length;
  const upcomingCount = scores.filter((s) => s.status === 'upcoming').length;
  const finishedCount = scores.filter((s) => s.status === 'finished').length;

  return {
    scores,
    loading,
    error,
    lastUpdate,
    isUpdating,
    usingMock,
    liveCount,
    upcomingCount,
    finishedCount,
    refresh: () => fetchScores(true),
  };
}
