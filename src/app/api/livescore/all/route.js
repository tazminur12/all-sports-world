import { NextResponse } from 'next/server';

// Default এ এই sports fetch করবো (সব করলে API limit শেষ হবে)
const DEFAULT_SPORTS = [
  'football',
  'basketball',
  'tennis',
  'cricket',
  'ice-hockey',
  'volleyball',
  'table-tennis',
  'badminton',
  'handball',
  'mma',
  'darts',
  'snooker',
  'baseball',
  'american-football',
  'motorsport',
  'rugby',
  'esports',
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?sports=football,basketball,tennis — specific sports চাইলে
    const requestedSports = searchParams.get('sports')
      ? searchParams.get('sports').split(',')
      : DEFAULT_SPORTS;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const today   = new Date().toISOString().split('T')[0];

    // সব sports parallel এ fetch করো
    const results = await Promise.allSettled(
      requestedSports.map((sport) =>
        fetch(`${baseUrl}/api/livescore/all/${sport}`, {
          cache: 'no-store',
        })
          .then((r) => r.json())
          .catch(() => ({ success: false, events: [] }))
      )
    );

    const allData = {};
    results.forEach((result, i) => {
      const sport = requestedSports[i];
      allData[sport] = result.status === 'fulfilled'
        ? (result.value.events || [])
        : [];
    });

    // Summary stats
    const summary = {
      totalSports:  requestedSports.length,
      totalMatches: Object.values(allData).reduce(
        (sum, arr) => sum + arr.length, 0
      ),
      sportsWithMatches: Object.entries(allData)
        .filter(([, arr]) => arr.length > 0)
        .map(([sport]) => sport),
    };

    return NextResponse.json({
      success: true,
      date:    today,
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
