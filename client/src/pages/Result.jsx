import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useQuiz } from '../context/useQuiz';
import api from '../services/api';
import ScoreCard from '../components/result/ScoreCard';
import PerformanceSummary from '../components/result/PerformanceSummary';
import WeakAreas from '../components/result/WeakAreas';
import ImprovementSuggestions from '../components/result/ImprovementSuggestions';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Trophy, Star, Sparkles, RotateCcw } from 'lucide-react';

const confettiIcons = [Trophy, Star, Sparkles];

export default function Result() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [animatedPct, setAnimatedPct] = useState(0);
  const animationRef = useRef(null);

  const pct = state.questions.length > 0 ? Math.round((state.score / state.questions.length) * 100) : 0;

  const glowClass = pct >= 80 ? 'glow-emerald' : pct >= 60 ? 'glow-amber' : 'glow-red';

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
        score: state.score,
        total: state.questions.length,
      }).then(() => toast.success('Progress saved!'))
        .catch(() => {})
        .finally(() => setSaved(true));
    }
  }, [state.quizStatus, state.career, state.subcategory, state.level, state.score, state.questions.length, saved, navigate]);

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
    dispatch({ type: 'RESET' });
    navigate('/careers');
  };

  const handleNewQuiz = () => {
    dispatch({ type: 'RESET' });
    navigate('/careers');
  };

  const circleBorder = pct >= 80 ? 'border-emerald-500' : pct >= 60 ? 'border-amber-500' : 'border-red-500';
  const circleText = pct >= 80 ? 'text-emerald-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600';
  const circleBg = pct >= 80 ? 'bg-emerald-50' : pct >= 60 ? 'bg-amber-50' : 'bg-red-50';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Card className={`p-8 ${glowClass}`}>
          <motion.div
            className="text-center mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
          >
            <div
              className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold border-4 ${circleBorder} ${circleText} ${circleBg}`}
            >
              <motion.span
                className="tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {animatedPct}%
              </motion.span>
            </div>
          </motion.div>

          <ScoreCard
            score={state.score}
            total={state.questions.length}
            career={state.career}
            language={state.subcategory}
            level={state.level}
          />
        </Card>
      </motion.div>

      <PerformanceSummary
        score={state.score}
        total={state.questions.length}
        pct={pct}
      />

      <WeakAreas
        questions={state.questions}
        answers={state.answers}
      />

      <ImprovementSuggestions pct={pct} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="gradient" size="lg" onClick={handleRetry} icon={<RotateCcw className="w-4 h-4" />}>
            Try Again
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button variant="outline" size="lg" onClick={handleNewQuiz}>
            New Quiz
          </Button>
        </motion.div>
      </motion.div>

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
