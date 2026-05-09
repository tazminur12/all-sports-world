export function toSlug(name) {
    if (!name) return '';
    return name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')       // ✅ AT&T → att → at-and-t নয়, "at-and-t"
      .replace(/[^a-z0-9\s-]/g, '') // special chars remove
      .replace(/\s+/g, '-')          // spaces → hyphens
      .replace(/-+/g, '-')           // double hyphens → single
      .replace(/^-|-$/g, '');        // leading/trailing hyphens remove
  }
  
  export function fromSlug(slug) {
    if (!slug) return '';
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
  
  export function findBySlug(dataArray, slug) {
    return dataArray.find((item) => toSlug(item.name) === slug) ?? null;
  }
  