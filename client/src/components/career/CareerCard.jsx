import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Card from '../common/Card';

const careerAccents = {
  frontend: 'cyan',
  backend: 'blue',
  fullstack: 'purple',
  'core-subjects': 'red',
  'data-analyst': 'amber',
  'ai-ml': 'green',
};

const careerIconColors = {
  frontend: 'bg-cyan-100 text-cyan-700 group-hover:bg-cyan-200',
  backend: 'bg-blue-100 text-blue-700 group-hover:bg-blue-200',
  fullstack: 'bg-purple-100 text-purple-700 group-hover:bg-purple-200',
  'core-subjects': 'bg-red-100 text-red-700 group-hover:bg-red-200',
  'data-analyst': 'bg-amber-100 text-amber-700 group-hover:bg-amber-200',
  'ai-ml': 'bg-green-100 text-green-700 group-hover:bg-green-200',
};

const careerBadgeColors = {
  frontend: 'cyan',
  backend: 'blue',
  fullstack: 'purple',
  'core-subjects': 'red',
  'data-analyst': 'amber',
  'ai-ml': 'green',
};

export default function CareerCard({ career, onSelect }) {
  const accent = careerAccents[career.id] || 'indigo';
  const iconColor = careerIconColors[career.id] || 'bg-brand-100 text-brand-700 group-hover:bg-brand-200';
  const badgeColor = careerBadgeColors[career.id] || 'default';

  return (
    <Card hover onClick={() => onSelect(career)} accent={accent} className="p-6 text-center group">
      <motion.span
        className={`text-4xl block mb-3 transition-fast`}
        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}
      >
        {career.icon}
      </motion.span>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-brand-600 transition-fast">{career.name}</h3>
      <p className="text-sm text-gray-500">{career.description}</p>
      {career.hasSubCategories && (
        <span className={`inline-flex items-center gap-1 mt-3 text-xs font-medium px-3 py-1 rounded-full transition-fast bg-${accent}-50 text-${accent}-700 group-hover:bg-${accent}-100`}>
          {career.subCategoryLabel || 'Choose subcategory'}
          <ArrowRight className="w-3 h-3" />
        </span>
      )}
    </Card>
  );
}
