'use client';
import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer({ targetDate, size = 'md', variant = 'default' }) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(targetDate);

  if (isOver) return (
    <span className="text-accentGreen font-bold text-sm animate-pulse">LIVE NOW</span>
  );

  const sizeClasses = {
    sm: { block: 'w-10 h-10',  num: 'text-base', label: 'text-[8px]', colon: 'text-base' },
    md: { block: 'w-14 h-14',  num: 'text-xl',   label: 'text-[9px]', colon: 'text-lg' },
    lg: { block: 'w-20 h-20',  num: 'text-3xl',  label: 'text-[10px]', colon: 'text-lg' },
    xl: { block: 'w-24 h-24',  num: 'text-4xl',  label: 'text-xs', colon: 'text-lg' },
    /** Hero: scales down on narrow phones, grows at sm/md/lg */
    hero: {
      block:
        'w-[3.25rem] h-[3.25rem] min-[380px]:w-14 min-[380px]:h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24',
      num: 'text-xl min-[380px]:text-2xl sm:text-2xl md:text-3xl lg:text-4xl',
      label: 'text-[7px] min-[380px]:text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs',
      colon: 'text-sm sm:text-base md:text-lg',
    },
  };

  const s = sizeClasses[size] || sizeClasses.md;
  const rowGap =
    size === 'hero' ? 'gap-0.5 min-[380px]:gap-1 sm:gap-2' : 'gap-2';

  const variantBg = variant === 'hero'
    ? 'bg-white/10 border border-white/20'
    : 'bg-bgCard border border-white/10';

  const units = [
    { value: String(days).padStart(2, '0'),    label: 'DAYS' },
    { value: String(hours).padStart(2, '0'),   label: 'HRS'  },
    { value: String(minutes).padStart(2, '0'), label: 'MIN'  },
    { value: String(seconds).padStart(2, '0'), label: 'SEC'  },
  ];

  const colonClass = s.colon ?? 'text-lg';

  return (
    <div className={`flex items-center justify-center flex-wrap ${rowGap}`}>
      {units.map(({ value, label }, i) => (
        <div key={label} className={`flex items-center ${rowGap}`}>
          <div
            className={`${s.block} ${variantBg} rounded-lg sm:rounded-xl flex flex-col items-center justify-center backdrop-blur-sm shrink-0`}
          >
            <span className={`${s.num} font-display text-accentGreen leading-none`}>{value}</span>
            <span className={`${s.label} text-textSecondary tracking-widest mt-0.5`}>{label}</span>
          </div>
          {i < units.length - 1 && (
            <span
              className={`text-accentGreen/60 font-bold ${colonClass} -mt-1 select-none px-0.5 sm:px-0`}
              aria-hidden="true"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
