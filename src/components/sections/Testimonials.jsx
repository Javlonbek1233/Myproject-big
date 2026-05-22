import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../../data';

function TestimonialCard({ t }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="glass rounded-3xl p-8 border border-white/5 hover:border-white/10 transition-all duration-500 h-full relative overflow-hidden"
    >
      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-neon-blue/10">
        <FaQuoteLeft size={40} />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: t.stars }).map((_, i) => (
          <FiStar
            key={i}
            size={14}
            className="fill-current"
            style={{ color: '#fbbf24' }}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-slate-300 text-sm leading-relaxed mb-6 relative z-10">
        "{t.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-dark-900"
          style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}90)`, boxShadow: `0 0 20px ${t.color}30` }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="font-display font-bold text-white text-sm">{t.name}</p>
          <p className="text-xs text-slate-500">{t.role} · {t.company}</p>
        </div>
      </div>

      {/* Bottom accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${t.color}50, transparent)` }}
      />
    </motion.div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="testimonials" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-dark-800" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="orb w-96 h-96 bg-neon-blue/5 top-0 right-0" />

      <div ref={ref} className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 section-padding"
        >
          <p className="font-mono text-neon-blue/60 text-sm tracking-widest uppercase mb-3">Kind Words</p>
          <h2 className="section-title text-white mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            What my clients say about working with me. Every project is a collaboration built on trust and excellence.
          </p>
        </motion.div>

        {/* Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="px-6 md:px-12 lg:px-24 xl:px-32"
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            loop
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <TestimonialCard t={t} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
