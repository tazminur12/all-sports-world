import { NextResponse } from 'next/server';
import { sportApiUpstreamErrorResponse } from '@/lib/sportApi';
import { fetchScheduledEventsForSport } from '@/lib/livescoreScheduledUpstream';

export async function GET(request, { params }) {
  let sport = 'unknown';
  try {
    ({ sports: sport } = await params);
    const today = new Date().toISOString().split('T')[0];

    const result = await fetchScheduledEventsForSport(sport, today, {
      allowRetry429Once: true,
    });

    if (result.kind === 'upstream') {
      console.error(`[LiveScore API] ${sport}: SportAPI error: ${result.res.status}`);
      return sportApiUpstreamErrorResponse(result.res, { sport, events: [] });
    }

    return NextResponse.json({
      success: true,
      sport,
      date:    today,
      events:  result.events,
      cached:  result.cached === true,
    });
  } catch (error) {
    console.error(`[LiveScore API] ${sport}:`, error?.message);
    return NextResponse.json(
      { success: false, error: error.message, events: [] },
      { status: 500 }
    );
  }
}
