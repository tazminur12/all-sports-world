import { NextResponse } from 'next/server';
import { fetchScheduledEventsWindow } from '@/lib/livescoreScheduledUpstream';

/**
 * Default: football + cricket only (RapidAPI quota). Override with comma-separated slugs:
 *   LIVESCORE_SPORTS=football,cricket,basketball
 */
const DEFAULT_SPORTS = ['football', 'cricket'];

/** Extra delay between upstream calls when not served from memory cache. */
const STAGGER_MS = 400;

function resolveSportsList(searchParams) {
  const fromQuery = searchParams.get('sports');
  if (fromQuery) {
    return fromQuery.split(',').map((s) => s.trim()).filter(Boolean);
  }
  const fromEnv = process.env.LIVESCORE_SPORTS;
  if (fromEnv && fromEnv.trim()) {
    return fromEnv.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return DEFAULT_SPORTS;
}

/** How many UTC calendar days to merge from `today` (1–7). More days = more fixtures, more upstream calls. */
function resolveWindowDays(searchParams) {
  const q = searchParams.get('days');
  if (q != null && q !== '') {
    const n = parseInt(q, 10);
    if (Number.isFinite(n)) return Math.min(7, Math.max(1, n));
  }
  const env = parseInt(process.env.LIVESCORE_WINDOW_DAYS || '3', 10);
  return Number.isFinite(env) ? Math.min(7, Math.max(1, env)) : 3;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedSports = resolveSportsList(searchParams);
    const today = new Date().toISOString().split('T')[0];
    const windowDays = resolveWindowDays(searchParams);

    const allData = {};
    const rateLimited = [];

    for (let i = 0; i < requestedSports.length; i += 1) {
      const sport = requestedSports[i];
      if (i > 0) {
        await new Promise((r) => setTimeout(r, STAGGER_MS));
      }

      try {
        const result = await fetchScheduledEventsWindow(
          sport,
          today,
          windowDays,
          { allowRetry429Once: false, staggerBetweenDaysMs: 280 }
        );

        if (result.kind === 'ok') {
          allData[sport] = result.events;
          if (result.upstreamHad429) rateLimited.push(sport);
          continue;
        }

        allData[sport] = [];
      } catch (loopErr) {
        console.error(`[LiveScore API] aggregate ${sport}:`, loopErr?.message);
        allData[sport] = [];
      }
    }

    const summary = {
      totalSports:  requestedSports.length,
      windowDays,
      totalMatches: Object.values(allData).reduce(
        (sum, arr) => sum + arr.length,
        0
      ),
      sportsWithMatches: Object.entries(allData)
        .filter(([, arr]) => arr.length > 0)
        .map(([s]) => s),
      ...(rateLimited.length ? { upstreamRateLimited: rateLimited } : {}),
    };

    return NextResponse.json({
      success: true,
      date:    today,
      dateWindow: { from: today, days: windowDays },
      summary,
      data:    allData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
