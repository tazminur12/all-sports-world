import { NextResponse } from 'next/server';

const BASE_URL = 'https://sportapi7.p.rapidapi.com';

const HEADERS = {
  'X-RapidAPI-Key':  process.env.RAPIDAPI_KEY,
  'X-RapidAPI-Host': process.env.SPORTAPI_HOST || 'sportapi7.p.rapidapi.com',
};

export async function GET(request, { params }) {
  try {
    const { eventId } = await params;

    const res = await fetch(
      `${BASE_URL}/api/v1/event/${eventId}/incidents`,
      {
        headers: HEADERS,
        next: { revalidate: 20 },
      }
    );

    if (!res.ok) throw new Error(`Incidents API error: ${res.status}`);

    const data = await res.json();

    return NextResponse.json({
      success:   true,
      incidents: data.incidents || [],
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, incidents: [] },
      { status: 500 }
    );
  }
}
