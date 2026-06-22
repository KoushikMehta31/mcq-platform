import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useQuiz } from '../context/useQuiz';
import api from '../services/api';
import WeakAreas from '../components/result/WeakAreas';
import ImprovementSuggestions from '../components/result/ImprovementSuggestions';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  Trophy, Star, Sparkles, RotateCcw, BarChart3,
  CheckCircle2, XCircle, List, Target, ArrowRight,
  Award
} from 'lucide-react';

const confettiIcons = [Trophy, Star, Sparkles];

const careerLabels = {
  frontend: 'Frontend Developer',
  backend: 'Backend Developer',
  fullstack: 'Full Stack Developer',
  'core-subjects': 'Core Computer Subjects',
};

const statCards = [
  { key: 'total', label: 'Total Questions', icon: List, color: 'purple' },
  { key: 'correct', label: 'Correct Answers', icon: CheckCircle2, color: 'emerald' },
  { key: 'wrong', label: 'Wrong Answers', icon: XCircle, color: 'red' },
  { key: 'score', label: 'Score', icon: Target, color: 'brand' },
];

export default function Result() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(true);
  const [animatedPct, setAnimatedPct] = useState(0);
  const animationRef = useRef(null);

  const total = state.questions.length;
  const correct = state.score;
  const wrong = total - correct;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  const gradeKey = pct >= 80 ? 'excellent' : pct >= 60 ? 'good' : 'keepPracticing';
  const gradeColors = {
    excellent: { ring: 'ring-emerald-400', text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500', label: 'Excellent', desc: 'Outstanding performance!' },
    good: { ring: 'ring-amber-400', text: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-500', label: 'Good', desc: 'Well done, keep improving!' },
    keepPracticing: { ring: 'ring-red-400', text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-500', label: 'Keep Practicing', desc: 'Review and try again!' },
  };
  const grade = gradeColors[gradeKey];

  const [confettiItems] = useState(() =>
    [...Array(24)].map(() => ({
      x: Math.random() * window.innerWidth,
      rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
      duration: 2.5 + Math.random() * 3,
      delay: Math.random() * 2.5,
      left: Math.random() * 100,
      iconIndex: Math.floor(Math.random() * confettiIcons.length),
      color: ['#6366f1', '#d946ef', '#22c55e', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6'][Math.floor(Math.random() * 7)],
    }))
  );

  useEffect(() => {
    if (state.quizStatus !== 'finished') {
      navigate('/careers');
      return;
    }

    if (!saved) {
      api.post('/progress', {
        career: state.career,
        language: state.subcategory,
        level: state.level,
        score: correct,
        total,
      }).then(() => toast.success('Progress saved!'))
        .catch(() => toast.error('Failed to save progress'))
        .finally(() => {
          setSaved(true);
          setSaving(false);
        });
    }
  }, [state.quizStatus, state.career, state.subcategory, state.level, correct, total, saved, navigate]);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1200;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setAnimatedPct(Math.round(easeOut * pct));

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [pct]);

  const handleRetry = () => {
    dispatch({ type: 'RETAIN_CAREER_INFO' });
    navigate('/levels');
  };

  const handleNewQuiz = () => {
    dispatch({ type: 'RESET' });
    navigate('/careers');
  };

  const statValues = { total, correct, wrong, score: pct };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 text-brand-600 flex items-center justify-center mx-auto mb-3">
          <BarChart3 className="w-7 h-7" />
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">Result Dashboard</h1>
        <p className="text-gray-500 text-sm">
          {careerLabels[state.career] || state.career}
          {state.subcategory ? ` › ${state.subcategory.charAt(0).toUpperCase() + state.subcategory.slice(1)}` : ''}
          {' '}· {state.level?.charAt(0).toUpperCase() + state.level?.slice(1)}
        </p>
      </motion.div>

      {/* Score & Grade */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Card className={`p-6 sm:p-8 ${grade.bg} border-2 ${grade.border}`}>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            {/* Animated circle */}
            <motion.div
              className="relative flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
            >
              <div
                className={`w-36 h-36 rounded-full flex items-center justify-center text-4xl font-bold border-[5px] ${grade.border} ${grade.bg}`}
              >
                <motion.span
                  className={`tabular-nums ${grade.text}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {animatedPct}%
                </motion.span>
              </div>
            </motion.div>

            {/* Grade & score text */}
            <div className="text-center sm:text-left space-y-3 flex-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <Award className={`w-6 h-6 ${grade.text}`} />
                <span className={`text-2xl font-bold ${grade.text}`}>{grade.label}</span>
              </div>
              <p className="text-gray-500 text-sm">{grade.desc}</p>
              <div className="text-4xl font-bold text-gray-900 tabular-nums">
                {correct}
                <span className="text-gray-400 text-3xl mx-1">/</span>
                {total}
              </div>
              {saving && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <LoadingSpinner size="sm" />
                  Saving your progress...
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats dashboard grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statCards.map((stat, i) => {
          const val = statValues[stat.key];
          const color = stat.color;
          const bgMap = { purple: 'bg-purple-100', emerald: 'bg-emerald-100', red: 'bg-red-100', brand: 'bg-brand-100' };
          const textMap = { purple: 'text-purple-800', emerald: 'text-emerald-800', red: 'text-red-800', brand: 'text-brand-800' };
          const iconMap = { purple: 'text-purple-600', emerald: 'text-emerald-600', red: 'text-red-600', brand: 'text-brand-600' };

          return (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.35 }}
              className={`${bgMap[color]} rounded-xl p-4 flex flex-col items-center gap-2`}
            >
              <span className={`w-10 h-10 rounded-lg ${bgMap[color]} flex items-center justify-center ${iconMap[color]}`}>
                <stat.icon className="w-5 h-5" />
              </span>
              <p className={`text-2xl font-bold tabular-nums ${textMap[color]}`}>
                {stat.key === 'score' ? (
                  <>{val}<span className="text-sm">%</span></>
                ) : (
                  val
                )}
              </p>
              <p className="text-xs text-gray-500 text-center">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Wrong answers review */}
      <WeakAreas
        questions={state.questions}
        answers={state.answers}
      />

      {/* Improvement suggestions */}
      <ImprovementSuggestions pct={pct} />

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="gradient" size="lg" onClick={handleRetry} icon={<RotateCcw className="w-4 h-4" />}>
            Retry Quiz
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="outline" size="lg" onClick={handleNewQuiz} icon={<ArrowRight className="w-4 h-4" />}>
            New Quiz
          </Button>
        </motion.div>
      </motion.div>

      {/* Confetti for high scores */}
      {pct >= 80 && (
        <motion.div
          className="fixed inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {confettiItems.map((item, i) => {
            const ConfettiIcon = confettiIcons[item.iconIndex];
            return (
              <motion.div
                key={i}
                className="absolute"
                initial={{ x: item.x, y: -50, rotate: 0, opacity: 1 }}
                animate={{ y: window.innerHeight + 50, rotate: item.rotate, opacity: [1, 1, 0.5, 0] }}
                transition={{ duration: item.duration, delay: item.delay, repeat: 0 }}
                style={{ left: `${item.left}%` }}
              >
                <ConfettiIcon className="w-5 h-5" style={{ color: item.color }} />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
