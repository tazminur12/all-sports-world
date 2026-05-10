import { NextResponse } from 'next/server';

/**
 * SportAPI on RapidAPI (SofaScore-backed) — Quick Start & endpoint reference.
 * Base: https://sportapi7.p.rapidapi.com
 *
 * Auth (every request):
 *   X-RapidAPI-Key, X-RapidAPI-Host: sportapi7.p.rapidapi.com
 *
 * Primary flows:
 *   GET /api/v1/sport/{sport}/scheduled-events/{date}     date = YYYY-MM-DD
 *   GET /api/v1/sport/{sport}/{date}/{tzOffsetSec}/categories
 *   GET /api/v1/category/{id}/scheduled-events/{date}
 *   GET /api/v1/event/{id}
 *   GET /api/v1/event/{id}/incidents | lineups | statistics
 *   GET /api/v1/unique-tournament/{id}/season/{seasonId}/standings/total
 *   GET /api/v1/event/{id}/odds/{providerId}/all   (providerId e.g. 1)
 */

export const SPORTAPI_BASE_URL = 'https://sportapi7.p.rapidapi.com';

export function sportApiHeaders() {
  return {
    'X-RapidAPI-Key':  process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.SPORTAPI_HOST || 'sportapi7.p.rapidapi.com',
  };
}

export function sportApiUrl(path) {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${SPORTAPI_BASE_URL}${p}`;
}

export async function sportApiFetch(path, init = {}) {
  const { headers: extraHeaders, ...rest } = init;
  return fetch(sportApiUrl(path), {
    ...rest,
    headers: { ...sportApiHeaders(), ...extraHeaders },
  });
}

/** Path builders — keep in sync with SportAPI docs */
export const SportApiPaths = {
  scheduledEvents: (sport, date) =>
    `/api/v1/sport/${encodeURIComponent(sport)}/scheduled-events/${date}`,

  sportCategories: (sport, date, timezoneOffsetSeconds = 0) =>
    `/api/v1/sport/${encodeURIComponent(sport)}/${date}/${timezoneOffsetSeconds}/categories`,

  categoryScheduledEvents: (categoryId, date) =>
    `/api/v1/category/${categoryId}/scheduled-events/${date}`,

  event: (eventId) => `/api/v1/event/${eventId}`,
  eventIncidents: (eventId) => `/api/v1/event/${eventId}/incidents`,
  eventLineups: (eventId) => `/api/v1/event/${eventId}/lineups`,
  eventStatistics: (eventId) => `/api/v1/event/${eventId}/statistics`,

  standingsTotal: (uniqueTournamentId, seasonId) =>
    `/api/v1/unique-tournament/${uniqueTournamentId}/season/${seasonId}/standings/total`,

  eventOddsAll: (eventId, providerId = 1) =>
    `/api/v1/event/${eventId}/odds/${providerId}/all`,
};

/**
 * If upstream !ok, return a NextResponse with correct HTTP status (429, 401, 403, 502).
 * If ok, return null — caller should use res.json() (body not consumed).
 */
export async function sportApiUpstreamErrorResponse(res, body = {}) {
  if (res.ok) return null;

  const retryAfter = res.headers.get('retry-after');
  const raw = await res.text();
  let detail = raw;
  try {
    detail = JSON.parse(raw);
  } catch {
    /* keep string */
  }

  const status =
    res.status === 429 ? 429
      : res.status === 401 || res.status === 403 ? res.status
        : 502;

  const headers = {};
  if (retryAfter) headers['Retry-After'] = retryAfter;

  return NextResponse.json(
    {
      success: false,
      error:  `SportAPI ${res.status}`,
      detail: typeof detail === 'string' ? detail.slice(0, 200) : detail,
      ...body,
    },
    { status, headers }
  );
}
