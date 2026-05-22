import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { services } from '../../data';

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className={`glass rounded-3xl p-7 border ${service.border} bg-gradient-to-br ${service.gradient} group cursor-default transition-all duration-500 relative overflow-hidden`}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
      />

      {/* Icon */}
      <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="font-display font-bold text-xl mb-3 transition-colors duration-300"
        style={{ color: service.color }}
      >
        {service.title}
      </h3>

      {/* Desc */}
      <p className="text-slate-400 text-sm leading-relaxed mb-5">{service.desc}</p>

      {/* Features */}
      <ul className="space-y-2">
        {service.features.map((feat) => (
          <li key={feat} className="flex items-center gap-2.5 text-sm text-slate-300">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: `${service.color}20`, color: service.color }}
            >
              <FiCheck size={10} />
            </div>
            {feat}
          </li>
        ))}
      </ul>

      {/* Corner glow */}
      <div
        className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle, ${service.color}15, transparent)` }}
      />
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />
      <div className="absolute inset-0 bg-grid opacity-25" />
      <div className="orb w-80 h-80 bg-neon-pink/5 top-24 left-0" />
      <div className="orb w-96 h-96 bg-neon-blue/5 bottom-0 right-0" />

      <div ref={ref} className="relative z-10 section-padding max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">What I Offer</p>
          <h2 className="section-title text-white mb-4">
            My <span className="gradient-text">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            From concept to deployment, I deliver high-quality web solutions tailored to your needs.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="glass rounded-3xl p-10 border border-neon-blue/15 text-center relative overflow-hidden"
        >
          <div className="orb w-64 h-64 bg-neon-blue/8 -top-16 -left-16" />
          <div className="orb w-64 h-64 bg-neon-purple/8 -bottom-16 -right-16" />
          <div className="relative z-10">
            <h3 className="font-display font-bold text-3xl text-white mb-3">
              Ready to build something <span className="gradient-text">amazing?</span>
            </h3>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              Let's collaborate and bring your vision to life with cutting-edge technology and stunning design.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary inline-block"
            >
              Start a Project 🚀
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
