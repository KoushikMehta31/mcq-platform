import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/useQuiz';
import api from '../services/api';
import LevelCard from '../components/level/LevelCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { motion } from 'framer-motion';
import { Gauge } from 'lucide-react';

const levels = ['beginner', 'intermediate', 'advanced'];

export default function LevelSelection() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();

  const handleSelect = async (level) => {
    dispatch({ type: 'SET_LEVEL', payload: level });
    setLoading(true);
    try {
      const params = { career: state.career, level };
      if (state.subcategory) params.subcategory = state.subcategory;
      const res = await api.get('/questions', { params });
      dispatch({ type: 'SET_QUESTIONS', payload: res.data });
      navigate('/quiz');
    } catch {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" className="mt-20" />;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Gauge className="w-7 h-7" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Choose Difficulty</h1>
        <p className="text-gray-500">Select your experience level</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
      >
        {levels.map((level) => (
          <motion.div
            key={level}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            <LevelCard level={level} onSelect={handleSelect} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
