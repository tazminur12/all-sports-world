/**
 * Server-safe check
 */
function isBrowser() {
    return typeof window !== 'undefined';
  }
  
  /**
   * Convert a UTC ISO string to the user's local timezone.
   * Returns dateStr, timeStr, tzAbbr
   */
  export function toLocalTime(isoString) {
    // ✅ Invalid date guard
    if (!isoString) {
      return { dateStr: '', timeStr: '', tzAbbr: '' };
    }
  
    const date = new Date(isoString);
  
    // ✅ NaN guard
    if (isNaN(date.getTime())) {
      return { dateStr: 'Invalid date', timeStr: '', tzAbbr: '' };
    }
  
    const dateStr = date.toLocaleDateString(
      isBrowser() ? navigator.language : 'en-US',
      {
        weekday: 'short',
        month:   'short',
        day:     'numeric',
        year:    'numeric',
      }
    );
  
    const timeStr = date.toLocaleTimeString(
      isBrowser() ? navigator.language : 'en-US',
      {
        hour:   '2-digit',
        minute: '2-digit',
      }
    );
  
    // ✅ tzAbbr — server এ crash করবে না
    let tzAbbr = '';
    try {
      tzAbbr =
        new Intl.DateTimeFormat(undefined, { timeZoneName: 'short' })
          .formatToParts(date)
          .find((p) => p.type === 'timeZoneName')?.value ?? '';
    } catch {
      tzAbbr = '';
    }
  
    return { dateStr, timeStr, tzAbbr };
  }
  
  /**
   * Calculate countdown remaining time from now to a future date.
   */
  export function getCountdown(isoString) {
    if (!isoString) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
    }
  
    const end  = new Date(isoString).getTime();
    const diff = Math.max(end - Date.now(), 0);
  
    return {
      days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
      isOver:  diff === 0,
    };
  }
  
  /**
   * Format ISO date to readable short string
   * e.g. "Jun 11, 2026"
   */
  export function formatMatchDate(isoString) {
    if (!isoString) return '';
  
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
  
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day:   'numeric',
      year:  'numeric',
    });
  }
  