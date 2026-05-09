const COLOR_MAP = {
    green:  'bg-accentGreen/10 text-accentGreen border-accentGreen/30',
    blue:   'bg-accentBlue/10  text-accentBlue  border-accentBlue/30',
    red:    'bg-red-500/10     text-red-400     border-red-500/30',
    yellow: 'bg-yellow-400/10  text-yellow-400  border-yellow-400/30',
    gray:   'bg-white/10       text-textSecondary border-white/10',
  };
  
  export default function Badge({ text, color = 'green', className = '' }) {
    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold
                    tracking-widest uppercase border ${COLOR_MAP[color] ?? COLOR_MAP.green} ${className}`}
      >
        {text}
      </span>
    );
  }
  