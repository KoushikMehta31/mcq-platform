import { motion } from 'framer-motion';
import { Lightbulb, ArrowUpCircle } from 'lucide-react';

const suggestionsByRange = [
  {
    min: 0,
    max: 39,
    title: 'Start with the Basics',
    icon: Lightbulb,
    bg: 'bg-amber-50',
    border: 'border-l-amber-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    text: 'text-amber-800',
    items: [
      'Review core concepts and fundamentals of each topic',
      'Practice daily with shorter, focused sessions',
      'Use flashcards or notes to reinforce key terms',
      'Re-take the same quiz after studying to track improvement',
    ],
  },
  {
    min: 40,
    max: 59,
    title: 'Keep Building',
    icon: Lightbulb,
    bg: 'bg-orange-50',
    border: 'border-l-orange-400',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-700',
    text: 'text-orange-800',
    items: [
      'Focus on the questions you got wrong and understand why',
      'Try spaced repetition — revisit tough topics tomorrow',
      'Read explanations carefully to fill knowledge gaps',
      'Aim for consistency before moving to harder levels',
    ],
  },
  {
    min: 60,
    max: 79,
    title: 'Almost There',
    icon: Lightbulb,
    bg: 'bg-blue-50',
    border: 'border-l-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
    text: 'text-blue-800',
    items: [
      'Deep dive into advanced concepts in your weak areas',
      'Practice under timed conditions to improve speed',
      'Explain your reasoning out loud to cement understanding',
      'Try a harder difficulty level to stretch your skills',
    ],
  },
  {
    min: 80,
    max: 100,
    title: 'Mastery Level',
    icon: ArrowUpCircle,
    bg: 'bg-emerald-50',
    border: 'border-l-emerald-400',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-700',
    text: 'text-emerald-800',
    items: [
      'Challenge yourself with the next difficulty level',
      'Explore related topics to broaden your expertise',
      'Teach someone else — it reinforces your knowledge',
      'Set a perfect score as your next goal!',
    ],
  },
];

export default function ImprovementSuggestions({ pct }) {
  const range = suggestionsByRange.find((r) => pct >= r.min && pct <= r.max) || suggestionsByRange[0];
  const Icon = range.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.35 }}
      className={`${range.bg} rounded-xl border ${range.border} border-l-4 p-5 space-y-3`}
    >
      <div className="flex items-center gap-2">
        <span className={`w-7 h-7 rounded-lg ${range.iconBg} ${range.iconColor} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </span>
        <h3 className="text-lg font-bold text-gray-900">{range.title}</h3>
      </div>

      <ul className="space-y-2">
        {range.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 + i * 0.08, duration: 0.25 }}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <span className={`flex-shrink-0 w-1.5 h-1.5 rounded-full mt-1.5 ${range.iconColor}`} />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}
