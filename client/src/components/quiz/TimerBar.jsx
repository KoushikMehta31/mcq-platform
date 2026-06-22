import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle } from 'lucide-react';

export default function TimerBar({ duration = 30, onTimeout, isPaused }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeout]);

  const pct = (timeLeft / duration) * 100;
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-600';
  let ringColor = 'ring-emerald-300';
  if (pct < 25) {
    barColor = 'bg-red-500';
    textColor = 'text-red-600';
    ringColor = 'ring-red-300';
  } else if (pct < 50) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-600';
    ringColor = 'ring-amber-300';
  }

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className={`flex items-center gap-1.5 flex-shrink-0 p-1 rounded-full ring-2 ${ringColor} transition-all`}
        animate={pct < 25 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {pct < 25 ? (
          <AlertTriangle className={`w-4 h-4 ${textColor}`} />
        ) : (
          <Clock className={`w-4 h-4 ${textColor}`} />
        )}
      </motion.div>
      <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ width: '100%' }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3, ease: 'linear' }}
        />
      </div>
      <span className={`text-sm font-bold tabular-nums min-w-[3ch] text-right ${textColor}`}>
        {timeLeft}s
      </span>
    </div>
  );
}
