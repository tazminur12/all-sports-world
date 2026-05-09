'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSection() {
  const [email,    setEmail]    = useState('');
  const [success,  setSuccess]  = useState(false);
  const [loading,  setLoading]  = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  }

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-accentGreen/20 overflow-hidden p-10 text-center"
        >
          {/* Glow bg */}
          <div className="absolute inset-0 bg-green-glow opacity-40 pointer-events-none" />
          <div className="absolute inset-0 glass pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Icon */}
            <div className="w-14 h-14 rounded-2xl bg-accentGreen/10 border border-accentGreen/30
                            flex items-center justify-center">
              <Mail className="w-7 h-7 text-accentGreen" />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h2 className="section-title">
                Stay Ahead of the{' '}
                <span className="neon-text-green">Game</span>
              </h2>
              <p className="text-textSecondary text-sm max-w-md mx-auto">
                Get World Cup 2026 match alerts, team news, and exclusive analysis
                delivered straight to your inbox.
              </p>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-2 text-sm text-textSecondary">
              <div className="flex -space-x-2">
                {['ar', 'fr', 'br', 'gb', 'es'].map((code) => (
                  <img
                    key={code}
                    src={`https://flagcdn.com/w20/${code}.png`}
                    alt={code}
                    className="w-6 h-6 rounded-full border-2 border-bgPrimary object-cover"
                  />
                ))}
              </div>
              <span>Join <strong className="text-white">500K+</strong> football fans worldwide</span>
            </div>

            {/* Form / Success */}
            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-3 py-4"
                  >
                    <CheckCircle className="w-10 h-10 text-accentGreen" />
                    <p className="text-white font-semibold">You&apos;re in! 🎉</p>
                    <p className="text-textSecondary text-sm">Check your inbox for a confirmation.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-3 rounded-full glass border border-white/10
                                 focus:border-accentGreen/60 focus:outline-none text-sm text-white
                                 placeholder-textSecondary bg-transparent transition-colors duration-200"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary whitespace-nowrap"
                    >
                      {loading ? 'Subscribing...' : 'Subscribe Free'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <p className="text-xs text-textSecondary">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
