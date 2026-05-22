import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiGithub, FiDownload, FiArrowDown } from 'react-icons/fi';
import { FaTelegram } from 'react-icons/fa';
import { FiInstagram, FiLinkedin } from 'react-icons/fi';
import { personalInfo } from '../../data';

const TYPING_STRINGS = [
  'Web Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Creative Coder',
  'Frontend Engineer',
];

function useTypingEffect(strings, speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setIdx(i => (i + 1) % strings.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, pause]);

  return display;
}

const socials = [
  { icon: FiGithub, href: personalInfo.social.github, label: 'GitHub' },
  { icon: FaTelegram, href: personalInfo.social.telegram, label: 'Telegram' },
  { icon: FiInstagram, href: personalInfo.social.instagram, label: 'Instagram' },
  { icon: FiLinkedin, href: personalInfo.social.linkedin, label: 'LinkedIn' },
];

export default function Hero() {
  const typed = useTypingEffect(TYPING_STRINGS);
  const canvasRef = useRef(null);

  // Animated grid/aurora background on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aurora waves
      for (let i = 0; i < 3; i++) {
        const gradient = ctx.createRadialGradient(
          canvas.width * (0.3 + i * 0.2 + Math.sin(t + i) * 0.1),
          canvas.height * (0.5 + Math.cos(t * 0.7 + i) * 0.3),
          0,
          canvas.width / 2, canvas.height / 2,
          canvas.width * 0.6
        );
        const colors = [
          ['rgba(0,212,255,0.08)', 'transparent'],
          ['rgba(123,47,255,0.07)', 'transparent'],
          ['rgba(255,45,120,0.05)', 'transparent'],
        ];
        gradient.addColorStop(0, colors[i][0]);
        gradient.addColorStop(1, colors[i][1]);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-900"
    >
      {/* Aurora canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Floating orbs */}
      <div className="orb w-[500px] h-[500px] bg-neon-blue/8 -top-48 -left-24 animate-pulse-slow" />
      <div className="orb w-[400px] h-[400px] bg-neon-purple/8 -bottom-24 -right-24 animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="orb w-64 h-64 bg-neon-pink/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center section-padding max-w-5xl mx-auto pt-24"
      >
        {/* Badge */}
        <motion.div variants={item} className="inline-flex items-center gap-2 mb-8">
          <div className="glass px-5 py-2.5 rounded-full border border-neon-blue/20 flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_#4ade80]" />
            <span className="font-mono text-xs text-neon-blue/80 tracking-widest uppercase">
              Available for projects
            </span>
          </div>
        </motion.div>

        {/* Main heading */}
        <motion.div variants={item} className="mb-4">
          <h2 className="font-mono text-neon-blue/60 text-sm md:text-base tracking-[0.3em] uppercase mb-3">
            Hello World, I'm
          </h2>
          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none mb-2">
            <span className="text-white">Xaitboyev</span>
            <br />
            <span className="gradient-text">Javlonbek</span>
          </h1>
        </motion.div>

        {/* Subtitle with typing */}
        <motion.div variants={item} className="mb-6">
          <div className="text-xl md:text-2xl lg:text-3xl font-display text-slate-300">
            <span className="text-slate-500">I'm a </span>
            <span className="text-neon-blue font-semibold neon-text">{typed}</span>
            <span className="typing-cursor" />
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.age}-year-old developer from Uzbekistan 🇺🇿, crafting
          <span className="text-neon-blue"> premium digital experiences </span>
          with modern technologies. Turning ideas into{' '}
          <span className="text-neon-purple">pixel-perfect reality</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link to="projects" smooth duration={800}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 cursor-pointer"
            >
              <span>View My Work</span>
              <span>✨</span>
            </motion.button>
          </Link>
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline flex items-center gap-2"
          >
            <FiDownload size={16} />
            <span>Download CV</span>
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div variants={item} className="flex items-center justify-center gap-4 mb-16">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -4 }}
              whileTap={{ scale: 0.9 }}
              className="w-11 h-11 glass rounded-xl flex items-center justify-center text-slate-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all duration-300"
              title={label}
            >
              <Icon size={18} />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-16"
        >
          {personalInfo.stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-2xl p-4 border border-white/5 hover:border-neon-blue/20 transition-all"
            >
              <div className="font-display font-bold text-2xl gradient-text-blue">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={item}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-600"
        >
          <span className="font-mono text-xs tracking-widest">SCROLL DOWN</span>
          <FiArrowDown size={16} className="text-neon-blue/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
