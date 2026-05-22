import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCards, techMarquee } from '../../data';
import Marquee from 'react-fast-marquee';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' },
  }),
};

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      custom={index}
      whileHover={{ scale: 1.04, y: -8 }}
      className={`glass rounded-2xl p-6 border ${skill.border} bg-gradient-to-br ${skill.bg} transition-all duration-500 group cursor-default`}
      style={{ '--skill-color': skill.color }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-4xl">{skill.icon}</div>
        <div
          className="px-2.5 py-1 rounded-full text-xs font-mono font-medium opacity-80"
          style={{ background: `${skill.color}20`, color: skill.color, border: `1px solid ${skill.color}30` }}
        >
          {skill.level}
        </div>
      </div>

      {/* Name */}
      <h3
        className="font-display font-bold text-xl mb-2 transition-all duration-300"
        style={{ color: skill.color }}
      >
        {skill.name}
      </h3>

      {/* Desc */}
      <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
        {skill.desc}
      </p>

      {/* Bottom glow line */}
      <div
        className="mt-5 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
        style={{ background: `linear-gradient(90deg, ${skill.color}, transparent)` }}
      />
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="orb w-96 h-96 bg-neon-purple/6 top-1/4 right-0" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">What I Know</p>
          <h2 className="section-title text-white mb-4">
            My <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            Constantly learning and growing. Here's my current tech stack and expertise level.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {skillCards.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Marquee tech strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass rounded-2xl border border-white/5 overflow-hidden py-5"
        >
          <Marquee speed={40} gradient={false} pauseOnHover>
            {techMarquee.map((tech, i) => (
              <span
                key={i}
                className="mx-8 font-mono text-sm text-slate-500 hover:text-neon-blue transition-colors cursor-default whitespace-nowrap flex items-center gap-3"
              >
                <span className="w-1 h-1 rounded-full bg-neon-blue/40" />
                {tech}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
}
