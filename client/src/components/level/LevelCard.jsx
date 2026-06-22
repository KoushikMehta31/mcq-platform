import { motion } from 'framer-motion';
import { BookOpen, Shield, Zap } from 'lucide-react';
import Card from '../common/Card';
import Badge from '../common/Badge';

const levelMeta = {
  beginner: { label: 'Beginner', description: 'Start your learning journey with foundational concepts', color: 'beginner', icon: BookOpen, iconBg: 'bg-emerald-100 text-emerald-700', cardAccent: 'emerald' },
  intermediate: { label: 'Intermediate', description: 'Test and strengthen your core knowledge', color: 'intermediate', icon: Shield, iconBg: 'bg-blue-100 text-blue-700', cardAccent: 'blue' },
  advanced: { label: 'Advanced', description: 'Push your limits with complex challenges', color: 'advanced', icon: Zap, iconBg: 'bg-purple-100 text-purple-700', cardAccent: 'purple' },
};

export default function LevelCard({ level, onSelect }) {
  const meta = levelMeta[level];
  const Icon = meta.icon;

  return (
    <Card hover onClick={() => onSelect(level)} accent={meta.cardAccent} className="p-6 text-center">
      <motion.div
        whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="flex justify-center mb-3"
      >
        <span className={`w-12 h-12 rounded-xl flex items-center justify-center transition-fast ${meta.iconBg}`}>
          <Icon className="w-6 h-6" />
        </span>
      </motion.div>
      <Badge color={meta.color}>{meta.label}</Badge>
      <p className="text-sm text-gray-500 mt-3">{meta.description}</p>
    </Card>
  );
}
