import Link from 'next/link';
import { FileText, ChevronRight } from 'lucide-react';

const SECTIONS = [
  {
    id:      'acceptance',
    title:   '1. Acceptance of Terms',
    content: [
      'By accessing and using All Sports World ("the Website"), you accept and agree to be bound by these Terms of Service and our Privacy Policy.',
      'If you do not agree to these terms, please do not use our website. Your continued use of the website following any changes constitutes your acceptance.',
      'We reserve the right to update these Terms at any time. Changes will be posted on this page with an updated revision date.',
    ],
  },
  {
    id:      'use',
    title:   '2. Permitted Use',
    content: [
      'You may use All Sports World for personal, non-commercial purposes only. You agree not to reproduce, distribute, or create derivative works from our content without express written permission.',
      'You must not use the website in any way that is unlawful, harmful, threatening, or otherwise objectionable.',
      'You agree not to use automated systems, bots, or scrapers to access our content or services without prior written consent.',
    ],
  },
  {
    id:      'content',
    title:   '3. Content & Intellectual Property',
    content: [
      'All content on All Sports World — including articles, images, statistics, match data, logos, and design elements — is owned by us or licensed to us.',
      'FIFA, World Cup, and related marks are trademarks of FIFA. Our use of these marks is for editorial and informational purposes only.',
      'Team names, national flags, player names, and stadium information are used under fair use for sports journalism and editorial reporting.',
      'You may share our articles on social media provided you credit All Sports World and link back to the original article.',
    ],
  },
  {
    id:      'accuracy',
    title:   '4. Accuracy of Information',
    content: [
      'We strive to provide accurate and up-to-date sports information, but we cannot guarantee the accuracy of all content, including match scores, squad lists, and statistics.',
      'World Cup 2026 schedule, venue, and team information is subject to change by FIFA at any time.',
      'We are not liable for any decisions made based on information provided on this website.',
    ],
  },
  {
    id:      'newsletter',
    title:   '5. Newsletter & Communications',
    content: [
      'By subscribing to our newsletter, you consent to receive marketing emails from All Sports World. You may unsubscribe at any time.',
      'We will never sell your email address to third parties or send spam.',
      'We may send transactional emails related to your account or subscription status.',
    ],
  },
  {
    id:      'liability',
    title:   '6. Limitation of Liability',
    content: [
      'All Sports World is provided on an "as is" basis without warranties of any kind, either express or implied.',
      'We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website.',
      'We are not responsible for the content of third-party websites that we link to for reference or additional reading.',
    ],
  },
  {
    id:      'governing',
    title:   '7. Governing Law',
    content: [
      'These Terms of Service are governed by and construed in accordance with the laws of the State of New York, USA.',
      'Any disputes arising under these terms will be subject to the exclusive jurisdiction of the courts of New York.',
      'If any provision of these Terms is found invalid or unenforceable, the remaining provisions will continue in full force.',
    ],
  },
  {
    id:      'contact',
    title:   '8. Contact Information',
    content: [
      'For questions about these Terms of Service, please contact us at legal@allsportsworld.com.',
      'For general enquiries, visit our Contact page or email hello@allsportsworld.com.',
      'All Sports World, New York, USA — World Cup 2026 Coverage Platform.',
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto">

      {/* ── Hero ── */}
      <div className="text-center mb-14">
        <div className="w-14 h-14 rounded-2xl bg-accentGreen/10 border border-accentGreen/30
                        flex items-center justify-center mx-auto mb-4">
          <FileText className="w-7 h-7 text-accentGreen" />
        </div>
        <span className="text-xs font-bold tracking-[0.3em] text-accentGreen uppercase">
          Legal
        </span>
        <h1 className="font-display text-5xl sm:text-6xl tracking-wider text-white mt-3">
          TERMS OF <span className="neon-text-green">SERVICE</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          Last updated: May 1, 2026
        </p>
        <p className="text-textSecondary text-sm mt-2 max-w-lg mx-auto leading-relaxed">
          Please read these Terms of Service carefully before using All Sports World.
          By accessing our website, you agree to be bound by these terms.
        </p>
      </div>

      {/* ── Quick Summary Banner ── */}
      <div className="glass rounded-2xl border border-accentGreen/20 p-5 mb-10">
        <p className="text-xs font-bold tracking-widest text-accentGreen uppercase mb-3">
          ⚡ Quick Summary
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-textSecondary">
          <div className="flex gap-2">
            <span className="text-accentGreen shrink-0">✅</span>
            <span>Free to read, share and enjoy our content</span>
          </div>
          <div className="flex gap-2">
            <span className="text-red-400 shrink-0">❌</span>
            <span>No commercial use or reproduction without permission</span>
          </div>
          <div className="flex gap-2">
            <span className="text-accentBlue shrink-0">ℹ️</span>
            <span>Match data is for informational purposes only</span>
          </div>
        </div>
      </div>

      {/* ── Table of Contents ── */}
      <div className="glass rounded-2xl border border-white/5 p-6 mb-10">
        <p className="text-xs font-bold tracking-widest text-accentGreen uppercase mb-4">
          Table of Contents
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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

      {/* ── Bottom CTA ── */}
      <div className="glass rounded-2xl border border-accentGreen/20 p-6 mt-10 text-center">
        <p className="text-sm text-white font-medium">
          Questions about our Terms of Service?
        </p>
        <p className="text-sm text-textSecondary mt-1">
          Email us at{' '}
          <a href="mailto:legal@allsportsworld.com"
             className="text-accentGreen hover:underline">
            legal@allsportsworld.com
          </a>
        </p>
        <div className="flex gap-3 justify-center mt-4 flex-wrap">
          <Link href="/contact"  className="btn-primary  text-xs">Contact Us</Link>
          <Link href="/privacy"  className="btn-secondary text-xs">Privacy Policy</Link>
        </div>
      </div>

    </div>
  );
}
