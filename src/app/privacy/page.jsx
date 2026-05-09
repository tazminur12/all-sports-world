import Link from 'next/link';
import { Shield, ChevronRight } from 'lucide-react';

const SECTIONS = [
  {
    id:      'information',
    title:   '1. Information We Collect',
    content: [
      'We collect information you provide directly to us, such as when you subscribe to our newsletter, create an account, or contact us for support.',
      'Usage Data: We automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed.',
      'Cookies and Tracking: We use cookies and similar tracking technologies to track activity on our website and hold certain information to improve your experience.',
    ],
  },
  {
    id:      'usage',
    title:   '2. How We Use Your Information',
    content: [
      'To provide, maintain, and improve our services, including World Cup 2026 coverage, match schedules, and news content.',
      'To send you newsletters, match alerts, and promotional communications — but only if you have opted in to receive them.',
      'To analyze usage patterns and improve our website\'s performance, design, and content.',
      'To comply with legal obligations and protect the rights and safety of our users.',
    ],
  },
  {
    id:      'sharing',
    title:   '3. Information Sharing',
    content: [
      'We do not sell, trade, or rent your personal information to third parties for their marketing purposes.',
      'We may share your information with trusted service providers who assist us in operating our website, provided they agree to keep this information confidential.',
      'We may disclose your information if required by law or in response to valid legal requests from public authorities.',
    ],
  },
  {
    id:      'cookies',
    title:   '4. Cookies Policy',
    content: [
      'We use essential cookies to make our website function correctly, and analytics cookies to understand how visitors interact with our content.',
      'You can control cookie preferences through your browser settings. Disabling cookies may affect the functionality of certain features.',
      'We use Google Analytics to track website traffic. This data is anonymized and used solely for improving our service.',
    ],
  },
  {
    id:      'rights',
    title:   '5. Your Rights',
    content: [
      'You have the right to access, update, or delete your personal information at any time by contacting us.',
      'You have the right to opt out of marketing communications. Every newsletter we send includes an unsubscribe link.',
      'If you are a resident of the European Economic Area (EEA), you have certain data protection rights under GDPR.',
    ],
  },
  {
    id:      'security',
    title:   '6. Data Security',
    content: [
      'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
      'However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security of your data.',
      'In the event of a data breach that affects your personal information, we will notify you as required by applicable law.',
    ],
  },
  {
    id:      'changes',
    title:   '7. Changes to This Policy',
    content: [
      'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page.',
      'We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.',
      'Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">

      {/* ── Hero ── */}
      <div className="text-center mb-14">
        <div className="w-14 h-14 rounded-2xl bg-accentBlue/10 border border-accentBlue/30
                        flex items-center justify-center mx-auto mb-4">
          <Shield className="w-7 h-7 text-accentBlue" />
        </div>
        <span className="text-xs font-bold tracking-[0.3em] text-accentBlue uppercase">
          Legal
        </span>
        <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-white mt-3">
          PRIVACY <span className="neon-text-blue">POLICY</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          Last updated: May 1, 2026
        </p>
        <p className="text-textSecondary text-sm mt-2 max-w-lg mx-auto leading-relaxed">
          At All Sports World, we are committed to protecting your privacy.
          This policy explains how we collect, use, and safeguard your information.
        </p>
      </div>

      {/* ── Table of Contents ── */}
      <div className="glass rounded-2xl border border-white/5 p-6 mb-10">
        <p className="text-xs font-bold tracking-widest text-accentGreen uppercase mb-4">
          Table of Contents
        </p>
        <ul className="flex flex-col gap-2">
          {SECTIONS.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="flex items-center gap-2 text-sm text-textSecondary
                           hover:text-accentGreen transition-colors duration-200 group"
              >
                <ChevronRight className="w-3 h-3 text-accentGreen/50
                                         group-hover:text-accentGreen transition-colors" />
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Sections ── */}
      <div className="flex flex-col gap-8">
        {SECTIONS.map(({ id, title, content }) => (
          <section
            key={id}
            id={id}
            className="glass rounded-2xl border border-white/5 p-6 scroll-mt-28"
          >
            <h2 className="font-bold text-white text-lg mb-4 pb-3
                           border-b border-white/5">
              {title}
            </h2>
            <ul className="flex flex-col gap-3">
              {content.map((para, i) => (
                <li key={i} className="flex gap-3 text-sm text-textSecondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accentGreen/50
                                   shrink-0 mt-2" />
                  {para}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* ── Contact ── */}
      <div className="glass rounded-2xl border border-accentBlue/20 p-6 mt-10 text-center">
        <p className="text-sm text-textSecondary">
          Questions about our privacy policy?
        </p>
        <p className="text-sm text-white font-medium mt-1">
          Contact us at{' '}
          <a href="mailto:privacy@allsportsworld.com"
             className="text-accentBlue hover:underline">
            privacy@allsportsworld.com
          </a>
        </p>
        <Link href="/contact" className="btn-secondary text-xs mt-4 inline-flex">
          Go to Contact Page →
        </Link>
      </div>

    </div>
  );
}
