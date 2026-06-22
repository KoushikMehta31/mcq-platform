import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Percent, List } from 'lucide-react';

const stats = [
  { key: 'correct', label: 'Correct', icon: CheckCircle, bg: 'bg-emerald-100', text: 'text-emerald-800', iconColor: 'text-emerald-600' },
  { key: 'incorrect', label: 'Incorrect', icon: XCircle, bg: 'bg-red-100', text: 'text-red-800', iconColor: 'text-red-600' },
  { key: 'pct', label: 'Percentage', icon: Percent, bg: 'bg-brand-100', text: 'text-brand-800', iconColor: 'text-brand-600' },
  { key: 'total', label: 'Total', icon: List, bg: 'bg-purple-100', text: 'text-purple-800', iconColor: 'text-purple-600' },
];

function AnimatedNumber({ value }) {
  const digits = String(value).split('').map((d, i) => (
    <motion.span
      key={i}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05, duration: 0.3 }}
      className="inline-block"
    >
      {d}
    </motion.span>
  ));

  return <>{digits}</>;
}

export default function PerformanceSummary({ score, total, pct }) {
  const incorrect = total - score;

  const values = { correct: score, incorrect, pct, total };

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const val = values[stat.key];
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
            className={`${stat.bg} rounded-xl p-4 flex items-center gap-3`}
          >
            <span className={`flex-shrink-0 w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center ${stat.iconColor}`}>
              <Icon className="w-5 h-5" />
            </span>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className={`text-xl font-bold tabular-nums ${stat.text}`}>
                {stat.key === 'pct' ? (
                  <><AnimatedNumber value={val} /><span className="text-sm">%</span></>
                ) : (
                  <AnimatedNumber value={val} />
                )}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
