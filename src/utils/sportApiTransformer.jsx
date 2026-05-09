// ─────────────────────────────────────────────
// SportAPI (SofaScore) → আমাদের format এ convert
// ─────────────────────────────────────────────

// Status map
const STATUS_MAP = {
    notStarted:  'upcoming',
    inprogress:  'live',
    finished:    'finished',
    postponed:   'postponed',
    canceled:    'canceled',
    interrupted: 'live',
    pause:       'live',
    overtime:    'live',
    penaltiesShootout: 'live',
    awarded:     'finished',
    delayed:     'upcoming',
  };
  
  // Sport display names
  const SPORT_LABELS = {
    football:         '⚽ Football',
    basketball:       '🏀 Basketball',
    tennis:           '🎾 Tennis',
    cricket:          '🏏 Cricket',
    'ice-hockey':     '🏒 Ice Hockey',
    handball:         '🤾 Handball',
    volleyball:       '🏐 Volleyball',
    baseball:         '⚾ Baseball',
    'american-football': '🏈 American Football',
    mma:              '🥊 MMA',
    motorsport:       '🏎️ Motorsport',
    rugby:            '🏉 Rugby',
    darts:            '🎯 Darts',
    snooker:          '🎱 Snooker',
    badminton:        '🏸 Badminton',
  };
  
  // Team logo URL
  function getTeamLogo(teamId) {
    return `https://img.sofascore.com/api/v1/team/${teamId}/image`;
  }
  
  // League logo URL
  function getLeagueLogo(uniqueTournamentId) {
    return `https://img.sofascore.com/api/v1/unique-tournament/${uniqueTournamentId}/image`;
  }
  
  // ── Football match transform ───────────────────
  export function transformFootballEvent(event) {
    const status = STATUS_MAP[event.status?.type] || 'upcoming';
    const isLive = status === 'live';
  
    // Live match minute calculate
    let minute = null;
    if (isLive && event.time) {
      const now       = Math.floor(Date.now() / 1000);
      const halfStart = event.time.currentPeriodStart || now;
      const elapsed   = Math.floor((now - halfStart) / 60);
      const base      = event.status?.description?.includes('2nd')
        ? 45
        : 0;
      minute = Math.min(base + elapsed, 90);
  
      // Extra time
      if (event.status?.description?.includes('Extra')) {
        minute = 90;
      }
    }
  
    // Period display
    const periodDisplay = event.status?.description || '';
  
    return {
      id:           event.id,
      sport:        'Football',
      sportSlug:    'football',
      league:       event.tournament?.name || 'Unknown League',
      leagueId:     event.tournament?.uniqueTournament?.id,
      leagueLogo:   '⚽',
      leagueImage:  event.tournament?.uniqueTournament?.id
        ? getLeagueLogo(event.tournament.uniqueTournament.id)
        : null,
      category:     event.tournament?.category?.name || '',
      categoryFlag: event.tournament?.category?.flag || '',
      status,
      minute,
      period:       periodDisplay,
      periodTime:   null,
      kickoff:      event.startTimestamp
        ? new Date(event.startTimestamp * 1000).toISOString()
        : null,
      team1: {
        id:    event.homeTeam?.id,
        name:  event.homeTeam?.name || 'Home',
        short: event.homeTeam?.shortName || event.homeTeam?.nameCode || 'HME',
        logo:  event.homeTeam?.id ? getTeamLogo(event.homeTeam.id) : null,
        score: event.homeScore?.current ?? null,
      },
      team2: {
        id:    event.awayTeam?.id,
        name:  event.awayTeam?.name || 'Away',
        short: event.awayTeam?.shortName || event.awayTeam?.nameCode || 'AWY',
        logo:  event.awayTeam?.id ? getTeamLogo(event.awayTeam.id) : null,
        score: event.awayScore?.current ?? null,
      },
      venue:  event.venue?.stadium?.name || event.venue?.city?.name || 'TBA',
      events: [], // incidents আলাদা fetch করতে হবে
    };
  }
  
  // ── Basketball match transform ─────────────────
  export function transformBasketballEvent(event) {
    const status = STATUS_MAP[event.status?.type] || 'upcoming';
    const isLive = status === 'live';
  
    // Period display
    const periodMap = {
      'Q1': '1st Quarter',
      'Q2': '2nd Quarter',
      'Q3': '3rd Quarter',
      'Q4': '4th Quarter',
      'OT': 'Overtime',
    };
  
    const desc    = event.status?.description || '';
    const period  = periodMap[desc] || desc;
  
    return {
      id:          event.id,
      sport:       'Basketball',
      sportSlug:   'basketball',
      league:      event.tournament?.name || 'Basketball',
      leagueId:    event.tournament?.uniqueTournament?.id,
      leagueLogo:  '🏀',
      leagueImage: event.tournament?.uniqueTournament?.id
        ? getLeagueLogo(event.tournament.uniqueTournament.id)
        : null,
      status,
      minute:      null,
      period:      isLive ? period : null,
      periodTime:  null,
      kickoff:     event.startTimestamp
        ? new Date(event.startTimestamp * 1000).toISOString()
        : null,
      team1: {
        id:    event.homeTeam?.id,
        name:  event.homeTeam?.name || 'Home',
        short: event.homeTeam?.nameCode || 'HME',
        logo:  event.homeTeam?.id ? getTeamLogo(event.homeTeam.id) : null,
        score: event.homeScore?.current ?? null,
      },
      team2: {
        id:    event.awayTeam?.id,
        name:  event.awayTeam?.name || 'Away',
        short: event.awayTeam?.nameCode || 'AWY',
        logo:  event.awayTeam?.id ? getTeamLogo(event.awayTeam.id) : null,
        score: event.awayScore?.current ?? null,
      },
      venue:  event.venue?.stadium?.name || 'TBA',
      events: [],
    };
  }
  
  // ── Tennis match transform ─────────────────────
  export function transformTennisEvent(event) {
    const status = STATUS_MAP[event.status?.type] || 'upcoming';
  
    // Score format: "6-4, 3-6, *5-3"
    const homeScore = formatTennisScore(event.homeScore);
    const awayScore = formatTennisScore(event.awayScore);
  
    return {
      id:          event.id,
      sport:       'Tennis',
      sportSlug:   'tennis',
      league:      event.tournament?.name || 'Tennis',
      leagueId:    event.tournament?.uniqueTournament?.id,
      leagueLogo:  '🎾',
      leagueImage: event.tournament?.uniqueTournament?.id
        ? getLeagueLogo(event.tournament.uniqueTournament.id)
        : null,
      status,
      minute:      null,
      period:      event.status?.description || null,
      periodTime:  null,
      kickoff:     event.startTimestamp
        ? new Date(event.startTimestamp * 1000).toISOString()
        : null,
      team1: {
        id:    event.homeTeam?.id,
        name:  event.homeTeam?.name || 'Player 1',
        short: event.homeTeam?.nameCode || 'P1',
        logo:  event.homeTeam?.id ? getTeamLogo(event.homeTeam.id) : null,
        score: homeScore,
      },
      team2: {
        id:    event.awayTeam?.id,
        name:  event.awayTeam?.name || 'Player 2',
        short: event.awayTeam?.nameCode || 'P2',
        logo:  event.awayTeam?.id ? getTeamLogo(event.awayTeam.id) : null,
        score: awayScore,
      },
      venue:  event.venue?.stadium?.name || 'Court TBA',
      events: [],
    };
  }
  
  function formatTennisScore(scoreObj) {
    if (!scoreObj) return null;
    const sets = [];
    ['period1', 'period2', 'period3', 'period4', 'period5'].forEach((p) => {
      if (scoreObj[p] !== undefined && scoreObj[p] !== null) {
        sets.push(scoreObj[p]);
      }
    });
    return sets.length ? sets.join('-') : (scoreObj.current ?? null);
  }
  
  // ── Cricket match transform ────────────────────
  export function transformCricketEvent(event) {
    const status = STATUS_MAP[event.status?.type] || 'upcoming';
  
    return {
      id:          event.id,
      sport:       'Cricket',
      sportSlug:   'cricket',
      league:      event.tournament?.name || 'Cricket',
      leagueId:    event.tournament?.uniqueTournament?.id,
      leagueLogo:  '🏏',
      leagueImage: event.tournament?.uniqueTournament?.id
        ? getLeagueLogo(event.tournament.uniqueTournament.id)
        : null,
      status,
      minute:      null,
      period:      event.status?.description || null,
      periodTime:  null,
      kickoff:     event.startTimestamp
        ? new Date(event.startTimestamp * 1000).toISOString()
        : null,
      team1: {
        id:    event.homeTeam?.id,
        name:  event.homeTeam?.name || 'Home',
        short: event.homeTeam?.nameCode || 'HME',
        logo:  event.homeTeam?.id ? getTeamLogo(event.homeTeam.id) : null,
        score: event.homeScore?.current ?? null,
      },
      team2: {
        id:    event.awayTeam?.id,
        name:  event.awayTeam?.name || 'Away',
        short: event.awayTeam?.nameCode || 'AWY',
        logo:  event.awayTeam?.id ? getTeamLogo(event.awayTeam.id) : null,
        score: event.awayScore?.current ?? null,
      },
      venue:  event.venue?.stadium?.name || 'Ground TBA',
      events: [],
    };
  }
  
  // ── Ice Hockey transform ───────────────────────
  export function transformIceHockeyEvent(event) {
    const status = STATUS_MAP[event.status?.type] || 'upcoming';
  
    const periodMap = {
      '1st period': 'P1',
      '2nd period': 'P2',
      '3rd period': 'P3',
      'Overtime':   'OT',
      'Shootout':   'SO',
    };
  
    const desc   = event.status?.description || '';
    const period = periodMap[desc] || desc;
  
    return {
      id:          event.id,
      sport:       'Ice Hockey',
      sportSlug:   'ice-hockey',
      league:      event.tournament?.name || 'Ice Hockey',
      leagueId:    event.tournament?.uniqueTournament?.id,
      leagueLogo:  '🏒',
      leagueImage: event.tournament?.uniqueTournament?.id
        ? getLeagueLogo(event.tournament.uniqueTournament.id)
        : null,
      status,
      minute:      null,
      period:      status === 'live' ? period : null,
      periodTime:  null,
      kickoff:     event.startTimestamp
        ? new Date(event.startTimestamp * 1000).toISOString()
        : null,
      team1: {
        id:    event.homeTeam?.id,
        name:  event.homeTeam?.name || 'Home',
        short: event.homeTeam?.nameCode || 'HME',
        logo:  event.homeTeam?.id ? getTeamLogo(event.homeTeam.id) : null,
        score: event.homeScore?.current ?? null,
      },
      team2: {
        id:    event.awayTeam?.id,
        name:  event.awayTeam?.name || 'Away',
        short: event.awayTeam?.nameCode || 'AWY',
        logo:  event.awayTeam?.id ? getTeamLogo(event.awayTeam.id) : null,
        score: event.awayScore?.current ?? null,
      },
      venue:  event.venue?.stadium?.name || 'Arena TBA',
      events: [],
    };
  }
  
  // ── Incidents transform ────────────────────────
  export function transformIncidents(incidents, homeTeamId) {
    return (incidents || [])
      .filter((inc) => ['goal', 'card', 'substitution'].includes(inc.incidentType))
      .map((inc) => ({
        minute: inc.time || 0,
        type:   inc.incidentType === 'card'
          ? (inc.incidentClass === 'yellow' ? 'yellowcard' : 'redcard')
          : inc.incidentType,
        team:   inc.isHome ? 1 : 2,
        player: inc.player?.name || inc.playerIn?.name || 'Player',
      }))
      .sort((a, b) => a.minute - b.minute);
  }
  
  // ── Universal transformer ──────────────────────
  export function transformEvent(event, sport) {
    switch (sport) {
      case 'football':          return transformFootballEvent(event);
      case 'basketball':        return transformBasketballEvent(event);
      case 'tennis':            return transformTennisEvent(event);
      case 'cricket':           return transformCricketEvent(event);
      case 'ice-hockey':        return transformIceHockeyEvent(event);
      default:                  return transformFootballEvent(event);
    }
  }
  