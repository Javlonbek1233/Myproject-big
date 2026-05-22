import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
  FiMail, FiSend, FiGithub, FiInstagram, FiLinkedin,
  FiMapPin, FiMessageSquare, FiUser, FiCheckCircle, FiXCircle,
} from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { personalInfo } from '../../data';

const SOCIALS = [
  { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub', color: '#f0f0f0' },
  { icon: FaTelegram, href: personalInfo.social.telegram, label: 'Telegram', color: '#00d4ff' },
  { icon: FiInstagram, href: personalInfo.social.instagram, label: 'Instagram', color: '#ff2d78' },
  { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: '#0077b5' },
];

function InputField({ label, icon: Icon, type = 'text', name, value, onChange, placeholder, required, textarea }) {
  const [focused, setFocused] = useState(false);

  const baseClass = `w-full bg-white/3 border rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 outline-none transition-all duration-300 font-body resize-none ${
    focused
      ? 'border-neon-blue/50 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
      : 'border-white/10 hover:border-white/20'
  }`;

  return (
    <div className="relative group">
      <label className="block text-xs font-mono text-slate-500 mb-2 uppercase tracking-wider">
        {label} {required && <span className="text-neon-pink">*</span>}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className={`absolute left-3.5 top-4 transition-colors duration-300 ${focused ? 'text-neon-blue' : 'text-slate-600'}`}
        />
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={5}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={baseClass + ' pl-10 pt-3.5'}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={baseClass + ' pl-10'}
          />
        )}
      </div>
    </div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const formRef = useRef(null);
  const inView = useInView(ref, { once: true });
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    setStatus('loading');
    try {
      // Replace with your EmailJS credentials
      await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current,
        'YOUR_PUBLIC_KEY'
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="orb w-96 h-96 bg-neon-blue/6 top-0 left-0" />
      <div className="orb w-80 h-80 bg-neon-purple/6 bottom-0 right-0" />

      <div ref={ref} className="relative z-10 section-padding max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">Let's Talk</p>
          <h2 className="section-title text-white mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Have a project in mind? Let's build something incredible together. I'm always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            {/* Contact cards */}
            {[
              { icon: FiMail, label: 'Email', value: personalInfo.email, color: '#00d4ff' },
              { icon: FiMapPin, label: 'Location', value: 'Uzbekistan 🇺🇿', color: '#7b2fff' },
              { icon: FiMessageSquare, label: 'Response Time', value: '< 24 hours', color: '#ff2d78' },
            ].map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.03, x: 5 }}
                className="glass rounded-2xl p-5 border border-white/5 hover:border-neon-blue/20 flex items-center gap-4 transition-all"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, color: item.color }}
                >
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-sm text-slate-200 font-medium">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-4">Find me on</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-11 h-11 glass rounded-xl flex items-center justify-center text-slate-400 transition-all duration-300"
                    onMouseEnter={e => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color + '30'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = ''; e.currentTarget.style.borderColor = ''; }}
                    title={label}
                  >
                    <Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass rounded-2xl p-6 border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
                <span className="text-green-400 font-semibold text-sm">Available for work</span>
              </div>
              <p className="text-slate-400 text-xs">
                Currently accepting freelance projects and collaborations. Let's build something great!
              </p>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

              <h3 className="font-display font-bold text-xl text-white mb-6">Send a Message</h3>

              <form ref={formRef} onSubmit={onSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField
                    label="Your Name"
                    icon={FiUser}
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="Javlonbek..."
                    required
                  />
                  <InputField
                    label="Email Address"
                    icon={FiMail}
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <InputField
                  label="Subject"
                  icon={FiMessageSquare}
                  name="subject"
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Project Inquiry..."
                  required
                />
                <InputField
                  label="Message"
                  icon={FiMessageSquare}
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  placeholder="Tell me about your project..."
                  required
                  textarea
                />

                {/* Status message */}
                <AnimatePresence>
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-400 text-sm bg-green-500/10 border border-green-500/20 rounded-xl p-3"
                    >
                      <FiCheckCircle size={16} />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3"
                    >
                      <FiXCircle size={16} />
                      Something went wrong. Please try again or email me directly.
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 font-display font-bold text-dark-900 bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl flex items-center justify-center gap-2.5 hover:shadow-neon-blue transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-dark-900/50 border-t-dark-900 rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
