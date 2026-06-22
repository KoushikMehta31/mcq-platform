import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/useQuiz';
import api from '../services/api';
import CareerCard from '../components/career/CareerCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { motion } from 'framer-motion';
import { Layers } from 'lucide-react';

export default function CareerSelection() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dispatch } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/questions/careers')
      .then((res) => setCareers(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (career) => {
    dispatch({ type: 'SET_CAREER', payload: career.id });
    if (career.hasSubCategories) {
      navigate(`/subcategories?career=${career.id}`);
    } else {
      navigate('/levels');
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 text-brand-600 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Layers className="w-8 h-8" />
          </div>
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2" />
          <div className="h-4 w-48 bg-gray-100 rounded animate-pulse mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse mx-auto mb-3" />
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-2" />
              <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-1" />
              <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse mx-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
          <Layers className="w-7 h-7" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Choose Your Path</h1>
        <p className="text-gray-500">Select a career domain to start practicing</p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.08 } },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {careers.map((career) => (
          <motion.div
            key={career.id}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 },
            }}
          >
            <CareerCard career={career} onSelect={handleSelect} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
