'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, MapPin, Phone, Send,
  Twitter, CheckCircle, Globe,
} from 'lucide-react';
import { FaXTwitter, FaYoutube, FaInstagram } from 'react-icons/fa6';

const CONTACT_INFO = [
  {
    icon:  Mail,
    label: 'Email Us',
    value: 'hello@allsportsworld.com',
    sub:   'We reply within 24 hours',
    color: 'text-accentGreen',
    bg:    'bg-accentGreen/10',
  },
  {
    icon:  MapPin,
    label: 'Our Office',
    value: 'New York, USA',
    sub:   'World Cup 2026 Headquarters',
    color: 'text-accentBlue',
    bg:    'bg-accentBlue/10',
  },
  {
    icon:  Phone,
    label: 'Press Line',
    value: '+1 (212) 555-0199',
    sub:   'Mon–Fri, 9am–6pm EST',
    color: 'text-yellow-400',
    bg:    'bg-yellow-400/10',
  },
];

const TOPICS = [
  'General Enquiry',
  'Press & Media',
  'Advertising',
  'Partnership',
  'Bug Report',
  'Other',
];

const SOCIALS = [
  { Icon: FaXTwitter,  label: 'Twitter / X',  handle: '@AllSportsWorld', href: '#' },
  { Icon: FaInstagram, label: 'Instagram',     handle: '@allsportsworld', href: '#' },
  { Icon: FaYoutube,   label: 'YouTube',       handle: 'All Sports World', href: '#' },
];

export default function ContactPage() {
  const [form, setForm]       = useState({ name: '', email: '', topic: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors,  setErrors]  = useState({});

  function validate() {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    if (!form.topic)          e.topic   = 'Please select a topic';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1400);
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 rounded-xl glass border text-sm text-white
     placeholder-textSecondary bg-transparent outline-none transition-colors duration-200
     ${errors[field]
       ? 'border-red-500/60 focus:border-red-500'
       : 'border-white/10 focus:border-accentGreen/60'
     }`;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-bold tracking-[0.3em] text-accentGreen uppercase">
          📬 Get In Touch
        </span>
        <h1 className="font-display text-5xl sm:text-7xl tracking-wider text-white mt-3">
          CONTACT <span className="neon-text-green">US</span>
        </h1>
        <p className="text-textSecondary text-sm mt-3 max-w-md mx-auto">
          Have a question, story tip, or partnership idea?
          We would love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Left: Info ── */}
        <div className="lg:col-span-2 flex flex-col gap-5">

          {/* Contact cards */}
          {CONTACT_INFO.map(({ icon: Icon, label, value, sub, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-2xl p-5 border border-white/5
                         hover:border-accentGreen/20 transition-colors duration-300
                         flex items-center gap-4"
            >
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center
                              justify-center shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-[10px] text-textSecondary tracking-widest uppercase">
                  {label}
                </p>
                <p className="text-sm font-bold text-white mt-0.5">{value}</p>
                <p className="text-xs text-textSecondary mt-0.5">{sub}</p>
              </div>
            </motion.div>
          ))}

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="glass rounded-2xl p-5 border border-white/5"
          >
            <p className="text-xs font-bold tracking-widest text-accentGreen
                           uppercase mb-4">
              Follow Us
            </p>
            <div className="flex flex-col gap-3">
              {SOCIALS.map(({ Icon, label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-3 text-textSecondary
                             hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 rounded-full glass border border-white/10
                                  flex items-center justify-center
                                  group-hover:border-accentGreen/40
                                  group-hover:text-accentGreen transition-all duration-200">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-white">{label}</p>
                    <p className="text-[10px] text-textSecondary">{handle}</p>
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: Form ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-3 glass rounded-2xl p-6 sm:p-8 border border-white/5"
        >
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center
                           py-16 gap-4 text-center"
              >
                <CheckCircle className="w-14 h-14 text-accentGreen" />
                <h3 className="font-display text-3xl tracking-wider text-white">
                  MESSAGE SENT!
                </h3>
                <p className="text-textSecondary text-sm max-w-xs">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSuccess(false); setForm({ name: '', email: '', topic: '', message: '' }); }}
                  className="btn-secondary text-sm mt-2"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
              >
                <h2 className="font-display text-2xl tracking-wider text-white">
                  SEND A <span className="neon-text-green">MESSAGE</span>
                </h2>

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-textSecondary mb-1.5 block">
                      Your Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-[10px] mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-xs text-textSecondary mb-1.5 block">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className={inputClass('email')}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[10px] mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Topic */}
                <div>
                  <label className="text-xs text-textSecondary mb-1.5 block">
                    Topic
                  </label>
                  <select
                    name="topic"
                    value={form.topic}
                    onChange={handleChange}
                    className={`${inputClass('topic')} cursor-pointer`}
                  >
                    <option value="" disabled className="bg-bgCard">
                      Select a topic...
                    </option>
                    {TOPICS.map((t) => (
                      <option key={t} value={t} className="bg-bgCard text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.topic && (
                    <p className="text-red-400 text-[10px] mt-1">{errors.topic}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs text-textSecondary mb-1.5 block">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us what's on your mind..."
                    rows={5}
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-[10px] mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-bgPrimary/30
                                      border-t-bgPrimary rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </div>
  );
}
