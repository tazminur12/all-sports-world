// src/config/sports.js

export const ALL_SPORTS = [
    // ── Ball Sports ─────────────────────────────
    { slug: 'football',         label: 'Football',         emoji: '⚽', category: 'Ball Sports'  },
    { slug: 'basketball',       label: 'Basketball',       emoji: '🏀', category: 'Ball Sports'  },
    { slug: 'volleyball',       label: 'Volleyball',       emoji: '🏐', category: 'Ball Sports'  },
    { slug: 'beach-volleyball', label: 'Beach Volleyball', emoji: '🏐', category: 'Ball Sports'  },
    { slug: 'handball',         label: 'Handball',         emoji: '🤾', category: 'Ball Sports'  },
    { slug: 'futsal',           label: 'Futsal',           emoji: '⚽', category: 'Ball Sports'  },
    { slug: 'baseball',         label: 'Baseball',         emoji: '⚾', category: 'Ball Sports'  },
    { slug: 'american-football',label: 'American Football',emoji: '🏈', category: 'Ball Sports'  },
    { slug: 'rugby',            label: 'Rugby',            emoji: '🏉', category: 'Ball Sports'  },
    { slug: 'aussie-rules',     label: 'Aussie Rules',     emoji: '🏈', category: 'Ball Sports'  },
    { slug: 'waterpolo',        label: 'Water Polo',       emoji: '🤽', category: 'Ball Sports'  },
    { slug: 'floorball',        label: 'Floorball',        emoji: '🏑', category: 'Ball Sports'  },
    { slug: 'bandy',            label: 'Bandy',            emoji: '🏒', category: 'Ball Sports'  },
  
    // ── Racket Sports ────────────────────────────
    { slug: 'tennis',           label: 'Tennis',           emoji: '🎾', category: 'Racket Sports' },
    { slug: 'table-tennis',     label: 'Table Tennis',     emoji: '🏓', category: 'Racket Sports' },
    { slug: 'badminton',        label: 'Badminton',        emoji: '🏸', category: 'Racket Sports' },
    { slug: 'squash',           label: 'Squash',           emoji: '🎾', category: 'Racket Sports' },
  
    // ── Combat Sports ────────────────────────────
    { slug: 'mma',              label: 'MMA',              emoji: '🥊', category: 'Combat Sports' },
    { slug: 'boxing',           label: 'Boxing',           emoji: '🥊', category: 'Combat Sports' },
  
    // ── Ice Sports ───────────────────────────────
    { slug: 'ice-hockey',       label: 'Ice Hockey',       emoji: '🏒', category: 'Ice Sports'   },
  
    // ── Cricket ──────────────────────────────────
    { slug: 'cricket',          label: 'Cricket',          emoji: '🏏', category: 'Cricket'       },
  
    // ── Motorsport ───────────────────────────────
    { slug: 'motorsport',       label: 'Motorsport',       emoji: '🏎️', category: 'Motorsport'   },
    // Sub-categories (motorsport এর মধ্যে পাওয়া যাবে):
    // Formula 1, MotoGP, Nascar, WRC, Superbike, IndyCar, DTM, Formula E
  
    // ── Precision Sports ─────────────────────────
    { slug: 'darts',            label: 'Darts',            emoji: '🎯', category: 'Precision'     },
    { slug: 'snooker',          label: 'Snooker',          emoji: '🎱', category: 'Precision'     },
  
    // ── Other ────────────────────────────────────
    { slug: 'cycling',          label: 'Cycling',          emoji: '🚴', category: 'Other'         },
  
    // ── Esports ──────────────────────────────────
    { slug: 'esports',          label: 'Esports',          emoji: '🎮', category: 'Esports'       },
    // Sub: CS:GO, Dota 2, League of Legends
  ];
  
  // Category গুলো
  export const SPORT_CATEGORIES = [
    'All Sports',
    'Ball Sports',
    'Racket Sports',
    'Combat Sports',
    'Ice Sports',
    'Cricket',
    'Motorsport',
    'Precision',
    'Esports',
    'Other',
  ];
  
  // Slug → Sport object
  export const SPORT_BY_SLUG = ALL_SPORTS.reduce((acc, s) => {
    acc[s.slug] = s;
    return acc;
  }, {});
  