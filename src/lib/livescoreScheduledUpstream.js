import { sportApiFetch, SportApiPaths } from '@/lib/sportApi';

const CACHE_TTL_MS = 90_000;

/** @type {Map<string, { at: number, events: unknown[] }>} */
const scheduledCache = new Map();

function cacheKey(sport, date) {
  return `${sport}|${date}`;
}

/** `yyyy-mm-dd` + whole UTC days → `yyyy-mm-dd` (avoids local TZ drift). */
export function addUtcDays(yyyyMmDd, deltaDays) {
  const [y, m, d] = yyyyMmDd.split('-').map(Number);
  const t = Date.UTC(y, m - 1, d) + deltaDays * 86_400_000;
  return new Date(t).toISOString().slice(0, 10);
}

/**
 * Merge scheduled events for `startDate` … `startDate + windowDays - 1` (dedupe by `event.id`).
 * Failed days are skipped so one 429 does not wipe the whole sport.
 */
export async function fetchScheduledEventsWindow(
  sport,
  startDate,
  windowDays,
  options = {}
) {
  const { staggerBetweenDaysMs = 280, allowRetry429Once = false } = options;
  const merged = [];
  const seen = new Set();
  const days = Math.max(1, Math.min(7, Math.floor(windowDays) || 1));
  let upstreamHad429 = false;

  for (let d = 0; d < days; d += 1) {
    if (d > 0 && staggerBetweenDaysMs > 0) {
      await new Promise((r) => setTimeout(r, staggerBetweenDaysMs));
    }
    const dateStr = addUtcDays(startDate, d);
    const result = await fetchScheduledEventsForSport(sport, dateStr, {
      allowRetry429Once,
    });
    if (result.kind !== 'ok') {
      if (result.res?.status === 429) upstreamHad429 = true;
      if (result.res) await result.res.text().catch(() => {});
      continue;
    }
    for (const ev of result.events || []) {
      const id = ev?.id;
      if (id == null || seen.has(id)) continue;
      seen.add(id);
      merged.push(ev);
    }
  }
  return { kind: 'ok', events: merged, cached: false, upstreamHad429 };
}

/**
 * One RapidAPI scheduled-events fetch per sport+date, with short-lived memory cache
 * so overlapping /api/livescore/all + tab refresh does not multiply upstream calls.
 */
export async function fetchScheduledEventsForSport(sport, date, options = {}) {
  try {
    const { allowRetry429Once = false } = options;
    const key = cacheKey(sport, date);
    const row = scheduledCache.get(key);
    if (row && Date.now() - row.at < CACHE_TTL_MS) {
      return { kind: 'ok', events: row.events, cached: true };
    }

    const path = SportApiPaths.scheduledEvents(sport, date);
    /** Route handlers: avoid `next: { revalidate }` on third-party fetch (can throw in some Next builds). */
    let res = await sportApiFetch(path, { cache: 'no-store' });

    if (allowRetry429Once && res.status === 429) {
      await res.text().catch(() => {});
      await new Promise((r) => setTimeout(r, 1_200));
      res = await sportApiFetch(path, { cache: 'no-store' });
    }

    if (!res.ok) {
      return { kind: 'upstream', res, sport };
    }

    let data;
    try {
      data = await res.json();
    } catch {
      return { kind: 'ok', events: [], cached: false };
    }
    const events = Array.isArray(data?.events) ? data.events : [];
    scheduledCache.set(key, { at: Date.now(), events });
    return { kind: 'ok', events, cached: false };
  } catch (e) {
    console.error('[LiveScore upstream]', sport, e?.message);
    return { kind: 'ok', events: [], cached: false };
  }
}
