'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { transformEvent } from '@/utils/sportApiTransformer';
import mockData from '../data/livescore.json';

/** Slower refresh eases RapidAPI quotas (was 30s; 17 sports × 30s exceeded free tiers). */
const REFRESH_INTERVAL = 120_000; // 2 minutes

/** Livescore page only loads these; sample rows should match so filters behave. */
const SAMPLE_SPORTS = new Set(['Football', 'Cricket']);

export function useLiveScores() {
  const [scores,     setScores]     = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [usingMock,  setUsingMock]  = useState(false);
  /** True when scores are from JSON because every upstream sport returned 429 (empty). */
  const [rateLimitSample, setRateLimitSample] = useState(false);
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
      if (!json.success || json.data == null) throw new Error('Invalid response');

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

      const dataKeys = Object.keys(json.data || {});
      const rateLimitedSports = json.summary?.upstreamRateLimited || [];
      const allRequestedRateLimited =
        dataKeys.length > 0 &&
        rateLimitedSports.length > 0 &&
        dataKeys.every((k) => rateLimitedSports.includes(k));

      if (transformed.length === 0) {
        if (allRequestedRateLimited) {
          const sample = mockData.filter((m) => SAMPLE_SPORTS.has(m.sport));
          setScores(sample.length ? sample : mockData);
          setUsingMock(true);
          setRateLimitSample(true);
        } else {
          /** Real empty window — do not pretend live data exists. */
          setScores([]);
          setUsingMock(false);
          setRateLimitSample(false);
        }
      } else {
        // Sort: live first, then upcoming, then finished
        const sorted = transformed.sort((a, b) => {
          const order = { live: 0, upcoming: 1, finished: 2 };
          return (order[a.status] ?? 3) - (order[b.status] ?? 3);
        });
        setScores(sorted);
        setUsingMock(false);
        setRateLimitSample(false);
      }

      setLastUpdate(new Date());

    } catch (err) {
      console.error('[useLiveScores]', err.message);
      setError(err.message);
      setScores(mockData);
      setUsingMock(true);
      setRateLimitSample(false);
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
    rateLimitSample,
    liveCount,
    upcomingCount,
    finishedCount,
    refresh: () => fetchScores(true),
  };
}
