import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const orbs = [
  { size: 300, color: 'rgba(99,102,241,0.12)', x: '10%', y: '10%', duration: 18, delay: 0 },
  { size: 250, color: 'rgba(217,70,239,0.10)', x: '70%', y: '5%', duration: 22, delay: 2 },
  { size: 200, color: 'rgba(236,72,153,0.10)', x: '50%', y: '60%', duration: 16, delay: 1 },
  { size: 180, color: 'rgba(16,185,129,0.08)', x: '85%', y: '70%', duration: 20, delay: 3 },
  { size: 220, color: 'rgba(59,130,246,0.08)', x: '20%', y: '75%', duration: 15, delay: 2.5 },
];

const shapes = [
  { type: 'circle', size: 12, color: '#6366f1', x: '15%', y: '25%', dur: 7, delay: 0 },
  { type: 'diamond', size: 10, color: '#d946ef', x: '80%', y: '30%', dur: 9, delay: 1.5 },
  { type: 'circle', size: 8, color: '#22c55e', x: '40%', y: '15%', dur: 6, delay: 2 },
  { type: 'diamond', size: 7, color: '#f59e0b', x: '65%', y: '75%', dur: 8, delay: 0.5 },
  { type: 'circle', size: 10, color: '#ec4899', x: '30%', y: '80%', dur: 10, delay: 3 },
  { type: 'diamond', size: 6, color: '#3b82f6', x: '90%', y: '55%', dur: 7, delay: 1 },
];

export default function HeroBackground() {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const generated = [...Array(20)].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 2,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    }));
    setDots(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/40 via-white to-accent-50/30" />

      {orbs.map((orb, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            backgroundColor: orb.color,
            left: orb.x,
            top: orb.y,
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 15, -10, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {shapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          animate={{
            y: [0, -20, 10, -5, 0],
            rotate: [0, 180, 360],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: shape.dur,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {shape.type === 'circle' ? (
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: shape.color, opacity: 0.3 }}
            />
          ) : (
            <div
              className="w-full h-full rotate-45 rounded-sm"
              style={{ backgroundColor: shape.color, opacity: 0.25 }}
            />
          )}
        </motion.div>
      ))}

      {dots.map((dot, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute rounded-full bg-brand-400/20"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
