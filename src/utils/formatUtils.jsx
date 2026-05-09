/**
 * Format a number with commas  →  82500 becomes "82,500"
 */
export function formatCapacity(number) {
    return new Intl.NumberFormat().format(number);
  }
  
  /**
   * Truncate text to maxLength with ellipsis
   */
  export function truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '...';
  }
  
  /**
   * Format a date string  →  "Jun 11, 2026"
   */
  export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day:   'numeric',
      year:  'numeric',
    });
  }
  
  /**
   * Get ordinal suffix  →  1 → "1st", 2 → "2nd", 3 → "3rd"
   */
  export function ordinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  }
  