import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="orb w-96 h-96 bg-neon-blue/10 top-1/4 left-1/4 animate-pulse-slow" />
            <div className="orb w-96 h-96 bg-neon-purple/10 bottom-1/4 right-1/4 animate-pulse-slow" style={{ animationDelay: '1s' }} />
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-8 relative z-10"
          >
            {/* Logo */}
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="w-20 h-20 rounded-full border-2 border-transparent"
                style={{
                  background: 'linear-gradient(#030712, #030712) padding-box, linear-gradient(135deg, #00d4ff, #7b2fff, #ff2d78) border-box',
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-display font-bold gradient-text">XJ</span>
              </div>
            </div>

            <div className="loading-logo">Loading...</div>

            {/* Progress bar */}
            <div className="flex flex-col items-center gap-3 w-full max-w-xs">
              <div className="loading-bar-track w-full">
                <motion.div
                  className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
                  style={{ boxShadow: '0 0 10px #00d4ff' }}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className="font-mono text-sm text-neon-blue/70">
                {Math.min(Math.floor(progress), 100)}%
              </span>
            </div>

            <p className="font-mono text-xs text-slate-500 tracking-widest uppercase animate-pulse">
              Initializing Portfolio...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
