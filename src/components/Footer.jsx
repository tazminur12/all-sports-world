import Link from 'next/link';
import { Globe } from 'lucide-react';
import { FaXTwitter, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa6';

// ── Footer link data ──────────────────────────
const FOOTER_LINKS = {
  Coverage: [
    { label: 'World Cup 2026',   href: '/schedule'    },
    { label: 'Group Stage',      href: '/schedule'    },
    { label: 'Knockout Rounds',  href: '/schedule'    },
    { label: 'Final',            href: '/schedule'    },
  ],
  Teams: [
    { label: 'Argentina',        href: '/teams'       },
    { label: 'Brazil',           href: '/teams'       },
    { label: 'France',           href: '/teams'       },
    { label: 'England',          href: '/teams'       },
    { label: 'Spain',            href: '/teams'       },
  ],
  Stadiums: [
    { label: 'MetLife Stadium',  href: '/stadiums'    },
    { label: 'SoFi Stadium',     href: '/stadiums'    },
    { label: 'Azteca',           href: '/stadiums'    },
    { label: 'AT&T Stadium',     href: '/stadiums'    },
  ],
  Company: [
    { label: 'About Us',         href: '/about'       },
    { label: 'Contact',          href: '/contact'     },
    { label: 'Privacy Policy',   href: '/privacy'     },
    { label: 'Terms of Service', href: '/terms'       },
  ],
};

const SOCIAL_LINKS = [
  { Icon: FaXTwitter,  href: '#', label: 'X (Twitter)' },
  { Icon: FaYoutube,   href: '#', label: 'YouTube'      },
  { Icon: FaInstagram, href: '#', label: 'Instagram'    },
  { Icon: FaFacebook,  href: '#', label: 'Facebook'     },
];

// ── Component ─────────────────────────────────
export default function Footer() {
  return (
    <footer className="bg-bgCard border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* ── Top Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-accentGreen
                              flex items-center justify-center">
                <Globe className="w-5 h-5 text-bgPrimary" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg tracking-widest text-white">
                  ALL SPORTS
                </span>
                <span className="text-[10px] tracking-[0.3em] text-accentGreen font-medium">
                  WORLD
                </span>
              </div>
            </Link>

            <p className="text-textSecondary text-sm leading-relaxed max-w-xs">
              Your premier global sports platform. Bringing you live coverage,
              match analysis, team news, and everything World Cup 2026.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center
                             border border-white/10 text-textSecondary
                             hover:text-accentGreen hover:border-accentGreen/40
                             transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-white font-bold text-xs tracking-widest
                             uppercase mb-4">
                {heading}
              </h4>
              <ul className="space-y-2.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-textSecondary text-sm
                                 hover:text-accentGreen transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom ── */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row
                        items-center justify-between gap-3">
          <p className="text-textSecondary text-xs">
            © 2026 All Sports World. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-textSecondary">
            <Link href="/privacy"
                  className="hover:text-accentGreen transition-colors duration-200">
              Privacy
            </Link>
            <span className="text-white/20">·</span>
            <Link href="/terms"
                  className="hover:text-accentGreen transition-colors duration-200">
              Terms
            </Link>
            <span className="text-white/20">·</span>
            <span className="flex items-center gap-1">
              Made with <span className="text-accentGreen">♥</span> for football fans
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
