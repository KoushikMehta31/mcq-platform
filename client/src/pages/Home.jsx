import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import Button from '../components/common/Button';
import { motion } from 'framer-motion';
import { Target, Timer, BarChart3, Zap, Puzzle, Trophy, FileQuestion, Globe, Gauge } from 'lucide-react';
import HeroBackground from '../components/home/HeroBackground';

const floatingIcons = [
  { icon: Target, color: 'text-brand-500' },
  { icon: Timer, color: 'text-emerald-500' },
  { icon: BarChart3, color: 'text-amber-500' },
  { icon: Puzzle, color: 'text-pink-500' },
  { icon: Trophy, color: 'text-cyan-500' },
  { icon: Zap, color: 'text-violet-500' },
  { icon: Target, color: 'text-red-400' },
  { icon: Globe, color: 'text-blue-400' },
  { icon: Gauge, color: 'text-purple-400' },
  { icon: Zap, color: 'text-orange-400' },
];

const featureColors = [
  { icon: Target, circle: 'bg-red-100 text-red-600 group-hover:bg-red-200', accent: 'red' },
  { icon: Timer, circle: 'bg-orange-100 text-orange-600 group-hover:bg-orange-200', accent: 'amber' },
  { icon: BarChart3, circle: 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200', accent: 'emerald' },
  { icon: Zap, circle: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200', accent: 'blue' },
  { icon: Puzzle, circle: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200', accent: 'purple' },
  { icon: Trophy, circle: 'bg-pink-100 text-pink-600 group-hover:bg-pink-200', accent: 'pink' },
];

const statIcons = [FileQuestion, Globe, Gauge];

export default function Home() {
  const { user } = useAuth();
  const [iconAnimations] = useState(() =>
    floatingIcons.map(() => ({
      x: Math.random() * 100 - 50 + '%',
      y: Math.random() * 100 + '%',
    }))
  );

  return (
    <div className="space-y-16 sm:space-y-24">
      <section className="relative text-center py-8 sm:py-16 overflow-hidden">
        <HeroBackground />

        <div className="absolute inset-0 pointer-events-none z-0">
          {floatingIcons.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                className={`absolute ${item.color}`}
                initial={iconAnimations[i]}
                animate={{
                  y: [0, -25, 0],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{
                  duration: 5 + i * 0.8,
                  repeat: Infinity,
                  delay: i * 0.6,
                }}
                style={{ left: 5 + (i * 9) % 85 + '%', top: 8 + (i * 8) % 78 + '%' }}
              >
                <Icon className="w-7 h-7 sm:w-9 sm:h-9" />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4"
            initial={{ backgroundPosition: '0% 50%' }}
            animate={{ backgroundPosition: '100% 50%' }}
            transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Master Your Knowledge
          </motion.h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto mb-6 leading-relaxed">
            Challenge yourself with timed quizzes across multiple domains. Track your progress and ace your interviews.
          </p>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-brand-500 via-accent-400 to-pink-500 rounded-full mx-auto mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4 relative z-10"
        >
          <Link to={user ? '/careers' : '/register'}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button size="lg" variant="gradient" icon={<Zap className="w-5 h-5" />}>
                {user ? 'Start a Quiz' : 'Start Practicing Free'}
              </Button>
            </motion.div>
          </Link>
          {!user && (
            <Link to="/login">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </motion.div>
            </Link>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 max-w-lg mx-auto relative z-10"
        >
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '30k+', label: 'Questions', icon: FileQuestion, color: 'text-brand-600', bg: 'bg-brand-50' },
              { value: '6', label: 'Domains', icon: Globe, color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { value: '3', label: 'Levels', icon: Gauge, color: 'text-amber-600', bg: 'bg-amber-50' },
            ].map((stat, si) => {
              const StatIcon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.7 + si * 0.15 }}
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${stat.bg} ${stat.color} mb-2`}
                  >
                    <StatIcon className="w-5 h-5" />
                  </motion.div>
                  <motion.div
                    className={`text-2xl sm:text-3xl font-bold ${stat.color}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.8 + si * 0.15 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs sm:text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          visible: { transition: { staggerChildren: 0.12 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
      >
        {[
          { icon: Target, title: 'Multiple Domains', desc: 'Practice frontend, backend, full stack, data, AI/ML, and core computer science' },
          { icon: Timer, title: 'Timed Challenges', desc: 'Race against the clock with per-question countdown timers that simulate real interview pressure' },
          { icon: BarChart3, title: 'Track Progress', desc: 'Save every quiz result and monitor your improvement across different subjects over time' },
          { icon: Zap, title: 'Instant Feedback', desc: 'Get immediate correct/incorrect answers with detailed explanations to learn as you go' },
          { icon: Puzzle, title: 'Sub-Categories', desc: 'Drill down into specific skills like React, Node.js, Python, or database systems' },
          { icon: Trophy, title: 'Interview Ready', desc: 'Build confidence with real-world interview questions spanning all experience levels' },
        ].map((feature, fi) => {
          const Icon = feature.icon;
          const fc = featureColors[fi];
          return (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group"
            >
              <span className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-fast ${fc.circle}`}>
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-brand-700 transition-fast">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          );
        })}
      </motion.section>
    </div>
  );
}
