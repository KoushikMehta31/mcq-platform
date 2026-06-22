import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuiz } from '../context/useQuiz';
import api from '../services/api';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { motion } from 'framer-motion';
import { Wrench, Type, Puzzle, BookOpen, Hash, ArrowRight } from 'lucide-react';

const typeIcons = {
  skill: Wrench,
  language: Type,
  stack: Puzzle,
  topic: BookOpen,
};

const typeColors = {
  skill: { bg: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200', accent: 'emerald' },
  language: { bg: 'bg-blue-100 text-blue-700 group-hover:bg-blue-200', accent: 'blue' },
  stack: { bg: 'bg-purple-100 text-purple-700 group-hover:bg-purple-200', accent: 'purple' },
  topic: { bg: 'bg-amber-100 text-amber-700 group-hover:bg-amber-200', accent: 'amber' },
};

export default function SubCategorySelection() {
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const location = useLocation();

  const careerParam = new URLSearchParams(location.search).get('career') || state.career;

  useEffect(() => {
    if (!careerParam) {
      navigate('/careers');
      return;
    }
    api.get('/questions/subcategories', { params: { career: careerParam } })
      .then((res) => setSubcategories(res.data))
      .catch(() => navigate('/careers'))
      .finally(() => setLoading(false));
  }, [careerParam, navigate]);

  const handleSelect = (sub) => {
    dispatch({ type: 'SET_SUBCATEGORY', payload: sub.id });
    navigate('/levels');
  };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Choose Your Subcategory</h1>
        <p className="text-gray-500">Select a specific area to focus on</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.07 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {subcategories.map((sub) => {
          const TypeIcon = typeIcons[sub.subCategoryType] || Hash;
          const tc = typeColors[sub.subCategoryType] || { bg: 'bg-gray-100 text-gray-700 group-hover:bg-gray-200', accent: 'gray' };
          return (
            <motion.div
              key={sub.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card hover onClick={() => handleSelect(sub)} accent={tc.accent} className="p-6 text-center group">
                <span className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-fast ${tc.bg}`}>
                  <TypeIcon className="w-6 h-6" />
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-brand-600 transition-fast">{sub.name}</h3>
                <p className="text-xs text-gray-400 capitalize mb-2">{sub.levels?.join(', ') || '3 levels'}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 opacity-0 group-hover:opacity-100 transition-fast">
                  Select <ArrowRight className="w-3 h-3" />
                </span>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
