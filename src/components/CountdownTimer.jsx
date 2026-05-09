'use client';
import { useCountdown } from '@/hooks/useCountdown';

export default function CountdownTimer({ targetDate, size = 'md', variant = 'default' }) {
  const { days, hours, minutes, seconds, isOver } = useCountdown(targetDate);

  if (isOver) return (
    <span className="text-accentGreen font-bold text-sm animate-pulse">LIVE NOW</span>
  );

  const sizeClasses = {
    sm: { block: 'w-10 h-10',  num: 'text-base', label: 'text-[8px]' },
    md: { block: 'w-14 h-14',  num: 'text-xl',   label: 'text-[9px]' },
    lg: { block: 'w-20 h-20',  num: 'text-3xl',  label: 'text-[10px]' },
    xl: { block: 'w-24 h-24',  num: 'text-4xl',  label: 'text-xs' },
  };

  const s = sizeClasses[size] || sizeClasses.md;

  const variantBg = variant === 'hero'
    ? 'bg-white/10 border border-white/20'
    : 'bg-bgCard border border-white/10';

  const units = [
    { value: String(days).padStart(2, '0'),    label: 'DAYS' },
    { value: String(hours).padStart(2, '0'),   label: 'HRS'  },
    { value: String(minutes).padStart(2, '0'), label: 'MIN'  },
    { value: String(seconds).padStart(2, '0'), label: 'SEC'  },
  ];

  return (
    <div className="flex items-center gap-2">
      {units.map(({ value, label }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`${s.block} ${variantBg} rounded-xl flex flex-col items-center justify-center backdrop-blur-sm`}>
            <span className={`${s.num} font-display text-accentGreen leading-none`}>{value}</span>
            <span className={`${s.label} text-textSecondary tracking-widest mt-0.5`}>{label}</span>
          </div>
          {i < units.length - 1 && (
            <span className="text-accentGreen/60 font-bold text-lg -mt-1 select-none">:</span>
          )}
        </div>
      ))}
    </div>
  );
}
