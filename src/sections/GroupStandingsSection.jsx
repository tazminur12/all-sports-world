'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import SectionHeader from '@/components/SectionHeader';
import FilterTabs from '@/components/FilterTabs';
import standingsData from '@/data/standings.json';

const COL_HEADERS = ['#', 'Team', 'P', 'W', 'D', 'L', 'GD', 'Pts'];

export default function GroupStandingsSection() {
  const groups     = standingsData.groups;
  const groupTabs  = groups.map((g) => `Group ${g.group}`);
  const [active, setActive] = useState(groupTabs[0]);

  const currentGroup = groups.find(
    (g) => `Group ${g.group}` === active
  );

  // Sort by points desc, then GD desc
  const sorted = [...(currentGroup?.teams ?? [])].sort(
    (a, b) => b.points - a.points || b.gd - a.gd
  );

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
        <SectionHeader
          eyebrow="📊 Group Stage"
          title="Group"
          highlight="Standings"
        />
        <FilterTabs tabs={groupTabs} active={active} onChange={setActive} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-white/5">
        <table className="w-full min-w-[520px]">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              {COL_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-[10px] font-bold tracking-widest
                             text-textSecondary uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((team, i) => (
              <motion.tr
                key={team.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className={`border-b border-white/5 transition-colors duration-200
                            hover:bg-white/5
                            ${i < 2 ? 'bg-accentGreen/5' : ''}`}
              >
                {/* Position */}
                <td className="px-4 py-3">
                  <span className={`text-sm font-bold ${i < 2 ? 'text-accentGreen' : 'text-textSecondary'}`}>
                    {i + 1}
                  </span>
                </td>

                {/* Team */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/10 shrink-0">
                      <Image
                        src={team.flag}
                        alt={team.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <span className="text-sm font-semibold text-white whitespace-nowrap">
                      {team.name}
                    </span>
                    {i < 2 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-accentGreen/20
                                       text-accentGreen font-bold hidden sm:inline">
                        Q
                      </span>
                    )}
                  </div>
                </td>

                {/* Stats */}
                {[team.played, team.won, team.drawn, team.lost].map((val, j) => (
                  <td key={j} className="px-4 py-3 text-sm text-textSecondary text-center">
                    {val}
                  </td>
                ))}

                {/* GD */}
                <td className="px-4 py-3 text-sm text-center">
                  <span className={
                    team.gd > 0 ? 'text-accentGreen' :
                    team.gd < 0 ? 'text-red-400' :
                    'text-textSecondary'
                  }>
                    {team.gd > 0 ? `+${team.gd}` : team.gd}
                  </span>
                </td>

                {/* Points */}
                <td className="px-4 py-3">
                  <span className="text-sm font-bold text-accentGreen">{team.points}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Legend */}
        <div className="flex items-center gap-4 px-4 py-3 border-t border-white/5 bg-white/2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-sm bg-accentGreen/20 border border-accentGreen/40" />
            <span className="text-[10px] text-textSecondary">Qualified for Round of 32</span>
          </div>
        </div>
      </div>
    </section>
  );
}
