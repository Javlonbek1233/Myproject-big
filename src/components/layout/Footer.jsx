import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import {
  FiGithub, FiInstagram, FiLinkedin, FiYoutube,
  FiMail, FiHeart, FiArrowUp,
} from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { personalInfo } from '../../data';

const socials = [
  { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub', color: '#f0f0f0' },
  { icon: FaTelegram, href: personalInfo.social.telegram, label: 'Telegram', color: '#00d4ff' },
  { icon: FiInstagram, href: personalInfo.social.instagram, label: 'Instagram', color: '#ff2d78' },
  { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn', color: '#0077b5' },
];

const quickLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Services', to: 'services' },
  { label: 'Contact', to: 'contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-dark-800 border-t border-white/5 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent" />
      <div className="orb w-64 h-64 bg-neon-blue/5 -top-32 left-1/4" />
      <div className="orb w-64 h-64 bg-neon-purple/5 -top-32 right-1/4" />

      <div className="section-padding max-w-7xl mx-auto py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-dark-900 font-display font-bold shadow-neon-blue">
                XJ
              </div>
              <span className="font-display font-bold text-xl gradient-text-blue">
                Xaitboyev Javlonbek
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              16-year-old web developer crafting premium digital experiences. 
              Turning ideas into reality with code, creativity & passion.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300"
                  style={{ '--hover-color': color }}
                  onMouseEnter={e => e.currentTarget.style.color = color}
                  onMouseLeave={e => e.currentTarget.style.color = ''}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    smooth
                    duration={800}
                    className="text-slate-400 hover:text-neon-blue transition-colors text-sm cursor-pointer flex items-center gap-2 group"
                  >
                    <span className="w-4 h-px bg-neon-blue/0 group-hover:bg-neon-blue/80 transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-white mb-5">Get In Touch</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-3 text-slate-400 hover:text-neon-blue transition-colors text-sm group"
              >
                <div className="w-8 h-8 glass rounded-lg flex items-center justify-center group-hover:border-neon-blue/30 transition-colors">
                  <FiMail size={14} />
                </div>
                {personalInfo.email}
              </a>
              <div className="glass rounded-xl p-4 mt-4">
                <p className="text-xs text-slate-500 mb-2">Available for</p>
                <p className="text-sm text-neon-blue font-medium">Freelance & Projects</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">Open to work</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm flex items-center gap-2">
            © 2025 Xaitboyev Javlonbek. Made with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FiHeart className="text-neon-pink" size={14} />
            </motion.span>
            in Uzbekistan
          </p>

          <Link to="hero" smooth duration={800}>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-slate-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all cursor-pointer"
            >
              <FiArrowUp size={16} />
            </motion.button>
          </Link>
        </div>
      </div>
    </footer>
  );
}
