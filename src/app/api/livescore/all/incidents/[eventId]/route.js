import { NextResponse } from 'next/server';
import {
  sportApiFetch,
  SportApiPaths,
  sportApiUpstreamErrorResponse,
} from '@/lib/sportApi';

export async function GET(request, { params }) {
  try {
    const { eventId } = await params;

    const res = await sportApiFetch(SportApiPaths.eventIncidents(eventId), {
      cache: 'no-store',
    });

    const errRes = await sportApiUpstreamErrorResponse(res, { incidents: [] });
    if (errRes) {
      console.error(`[LiveScore API] incidents/${eventId}: SportAPI error: ${res.status}`);
      return errRes;
    }

    const data = await res.json();

    return NextResponse.json({
      success:   true,
      incidents: data.incidents || [],
    });
  } catch (error) {
    console.error('[LiveScore API] incidents:', error?.message);
    return NextResponse.json(
      { success: false, error: error.message, incidents: [] },
      { status: 500 }
    );
  }
}
