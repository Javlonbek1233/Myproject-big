import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const navItems = [
  { label: 'Home', to: 'hero' },
  { label: 'About', to: 'about' },
  { label: 'Skills', to: 'skills' },
  { label: 'Projects', to: 'projects' },
  { label: 'Services', to: 'services' },
  { label: 'Contact', to: 'contact' },
];

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-dark-900/80 backdrop-blur-xl border-b border-white/5 shadow-xl'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="section-padding max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="hero" smooth duration={800} className="cursor-pointer">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-dark-900 font-display font-bold text-sm shadow-neon-blue">
                XJ
              </div>
              <span className="font-display font-bold text-lg hidden sm:block">
                <span className="gradient-text-blue">Javlonbek</span>
              </span>
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={800}
                spy
                onSetActive={() => setActive(item.to)}
                className="relative px-4 py-2 font-body text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
              >
                {active === item.to && (
                  <motion.span
                    layoutId="navPill"
                    className="absolute inset-0 rounded-full bg-white/5 border border-white/10"
                  />
                )}
                <span className="relative z-10 group-hover:text-neon-blue transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDark}
              className="w-9 h-9 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-neon-blue transition-colors"
            >
              {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </motion.button>

            {/* CTA */}
            <Link to="contact" smooth duration={800} className="hidden md:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-2.5 text-sm font-display font-semibold bg-gradient-to-r from-neon-blue to-neon-purple rounded-full text-dark-900 hover:shadow-neon-blue transition-shadow cursor-pointer"
              >
                Hire Me
              </motion.button>
            </Link>

            {/* Mobile menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-300"
            >
              {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu fixed inset-x-0 top-16 z-40 border-b border-white/10 py-6 md:hidden"
          >
            <div className="section-padding flex flex-col gap-2">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    smooth
                    duration={800}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 font-display font-medium text-slate-300 hover:text-neon-blue hover:bg-white/5 rounded-lg transition-all cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <Link to="contact" smooth duration={800} onClick={() => setMenuOpen(false)}>
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="w-full mt-2 py-3 font-display font-bold bg-gradient-to-r from-neon-blue to-neon-purple rounded-xl text-dark-900 cursor-pointer"
                >
                  Hire Me ✨
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
