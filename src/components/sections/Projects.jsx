import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../../data';

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Full Stack', value: 'fullstack' },
  { label: 'Creative', value: 'creative' },
];

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative glass rounded-3xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-500 group"
    >
      {/* Project visual */}
      <div className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
        {/* Animated bg */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-grid" />
        </div>
        <motion.div
          animate={hovered ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="text-8xl filter drop-shadow-2xl"
        >
          {project.emoji}
        </motion.div>

        {/* Overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-dark-900/70 flex items-center justify-center gap-4"
            >
              <motion.a
                href={project.demo}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white text-dark-900 rounded-full text-sm font-display font-bold hover:bg-neon-blue transition-colors"
              >
                <FiExternalLink size={14} />
                Live Demo
              </motion.a>
              <motion.a
                href={project.github}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 px-5 py-2.5 glass text-white rounded-full text-sm font-display font-bold hover:border-white/30 transition-colors"
              >
                <FiGithub size={14} />
                GitHub
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-medium backdrop-blur-md"
            style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
          >
            ⭐ Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <p className="text-xs font-mono text-slate-500 mb-1">{project.subtitle}</p>
          <h3 className="font-display font-bold text-xl text-white group-hover:text-neon-blue transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5">{project.desc}</p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 rounded-full text-xs font-mono"
              style={{
                background: `${project.color}10`,
                color: project.color,
                border: `1px solid ${project.color}20`,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <a
            href={project.demo}
            className="flex-1 py-2.5 text-center text-sm font-display font-semibold rounded-xl transition-all"
            style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}25` }}
            onMouseEnter={e => e.currentTarget.style.background = `${project.color}25`}
            onMouseLeave={e => e.currentTarget.style.background = `${project.color}15`}
          >
            <FiExternalLink className="inline mr-1.5" size={13} />
            Demo
          </a>
          <a
            href={project.github}
            className="flex-1 py-2.5 text-center text-sm font-display font-semibold text-slate-400 hover:text-white rounded-xl glass hover:border-white/20 transition-all"
          >
            <FiGithub className="inline mr-1.5" size={13} />
            Code
          </a>
        </div>
      </div>

      {/* Bottom glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="orb w-96 h-96 bg-neon-blue/5 bottom-0 left-0" />
      <div className="orb w-64 h-64 bg-neon-pink/5 top-24 right-1/4" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">What I've Built</p>
          <h2 className="section-title text-white mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            A showcase of projects I've built with passion, creativity, and modern technologies.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-12 flex-wrap"
        >
          {FILTERS.map(f => (
            <motion.button
              key={f.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-display font-medium transition-all duration-300 ${
                filter === f.value
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-dark-900 shadow-neon-blue'
                  : 'glass text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-14"
        >
          <a
            href={`https://github.com/javlonbek`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 btn-outline"
          >
            <FiGithub size={18} />
            View All on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
