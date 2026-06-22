import { motion } from 'framer-motion';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

export default function FeedbackOverlay({ isCorrect, explanation }) {
  const isTimedOut = isCorrect === undefined;

  const config = isCorrect
    ? { icon: CheckCircle, bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-700', label: 'Correct!' }
    : isTimedOut
      ? { icon: HelpCircle, bg: 'bg-orange-50 border-orange-200', text: 'text-orange-700', label: 'Timed Out' }
      : { icon: XCircle, bg: 'bg-red-50 border-red-200', text: 'text-red-700', label: 'Incorrect' };

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -15, height: 0 }}
      animate={{ opacity: 1, y: 0, height: 'auto' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`mt-6 p-4 rounded-xl overflow-hidden ${config.bg}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <motion.span
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Icon className={`w-5 h-5 ${config.text}`} />
        </motion.span>
        <span className={`font-bold ${config.text}`}>{config.label}</span>
      </div>
      {explanation && (
        <p className="text-sm text-gray-600 mt-1 ml-7">{explanation}</p>
      )}
    </motion.div>
  );
}
