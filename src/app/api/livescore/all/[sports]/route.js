import { NextResponse } from 'next/server';

const BASE_URL = 'https://sportapi7.p.rapidapi.com';

const HEADERS = {
  'X-RapidAPI-Key':  process.env.RAPIDAPI_KEY,
  'X-RapidAPI-Host': process.env.SPORTAPI_HOST || 'sportapi7.p.rapidapi.com',
};

export async function GET(request, { params }) {
  let sport = 'unknown';
  try {
    ({ sports: sport } = await params);
    const today = new Date().toISOString().split('T')[0];

    const res = await fetch(
      `${BASE_URL}/api/v1/sport/${sport}/scheduled-events/${today}`,
      {
        headers: HEADERS,
        next: { revalidate: 30 }, // 30s cache
      }
    );

    if (!res.ok) {
      throw new Error(`SportAPI error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      success: true,
      sport,
      date:   today,
      events: data.events || [],
    });

  } catch (error) {
    console.error(`[LiveScore API] ${sport}:`, error?.message);
    return NextResponse.json(
      { success: false, error: error.message, events: [] },
      { status: 500 }
    );
  }
}
