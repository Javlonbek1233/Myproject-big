import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CountUp from 'react-countup';
import { personalInfo, skills, timeline } from '../../data';

function SkillBar({ name, level, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-300">{name}</span>
        <span className="text-sm font-mono" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})`, boxShadow: `0 0 10px ${color}40` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Bg */}
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="orb w-80 h-80 bg-neon-blue/5 top-0 left-0" />
      <div className="orb w-80 h-80 bg-neon-purple/5 bottom-0 right-0" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="text-center mb-20"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">Get To Know</p>
          <h2 className="section-title text-white mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Left - Story */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={1}
          >
            {/* Avatar card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-3xl p-8 mb-8 border border-neon-blue/10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-neon-blue/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="flex items-center gap-5 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-dark-900 font-display font-bold text-2xl shadow-neon-blue">
                    XJ
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-dark-800 shadow-[0_0_8px_#4ade80]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-white">{personalInfo.name}</h3>
                  <p className="text-neon-blue/80 text-sm font-mono">{personalInfo.age} years old · {personalInfo.location}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-green-400">Available for work</span>
                  </div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">{personalInfo.longBio.split('\n')[0]}</p>
            </motion.div>

            <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
              {personalInfo.longBio.split('\n\n').slice(1).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </motion.div>

          {/* Right - Skills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            custom={2}
          >
            <h3 className="font-display font-bold text-xl text-white mb-8">
              Technical <span className="gradient-text-blue">Skills</span>
            </h3>
            {skills.slice(0, 8).map((skill, i) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
                delay={i * 0.08}
              />
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          custom={3}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24"
        >
          {personalInfo.stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-neon-blue/20 transition-all"
            >
              <div className="font-display font-bold text-4xl gradient-text-blue mb-2">
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2}
                    delay={0.5 + i * 0.1}
                  />
                )}
                {stat.suffix}
              </div>
              <div className="text-slate-500 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          custom={4}
        >
          <h3 className="font-display font-bold text-2xl text-white text-center mb-12">
            My <span className="gradient-text">Journey</span>
          </h3>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink opacity-30 hidden md:block" />

            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.1 }}
                  className={`flex items-center gap-6 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="glass rounded-2xl p-5 border border-white/5 hover:border-neon-blue/20 transition-all inline-block w-full"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{item.icon}</span>
                        <div>
                          <span className="font-mono text-xs text-neon-blue/60">{item.year}</span>
                          <h4 className="font-display font-bold text-white">{item.title}</h4>
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:flex w-4 h-4 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex-shrink-0 shadow-neon-blue" />

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
