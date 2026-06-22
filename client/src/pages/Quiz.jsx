import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/useQuiz';
import QuestionCard from '../components/quiz/QuestionCard';
import ProgressBar from '../components/quiz/ProgressBar';
import TimerBar from '../components/quiz/TimerBar';
import FeedbackOverlay from '../components/quiz/FeedbackOverlay';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { ArrowRight, ChevronLeft, Keyboard } from 'lucide-react';

export default function Quiz() {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const quizRef = useRef(null);

  useEffect(() => {
    if (state.quizStatus === 'idle' || !state.questions.length) {
      navigate('/careers');
    }
    if (state.quizStatus === 'finished') {
      navigate('/result');
    }
  }, [state.quizStatus, state.questions.length, navigate]);

  const handleTimeout = useCallback(() => {
    setSelected((prev) => {
      if (prev !== null) return prev;
      dispatch({ type: 'ANSWER_QUESTION', payload: -1 });
      setShowFeedback(true);
      setIsPaused(true);
      return -1;
    });
  }, [dispatch]);

  const question = state.questions[state.currentIndex];
  if (!question) return null;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    dispatch({ type: 'ANSWER_QUESTION', payload: idx });
    setShowFeedback(true);
    setIsPaused(true);
  };

  const handleNext = () => {
    dispatch({ type: 'NEXT_QUESTION' });
    setSelected(null);
    setShowFeedback(false);
    setIsPaused(false);
  };

  const handleKeyDown = useCallback((e) => {
    if (selected !== null) return;
    const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3 };
    if (e.key in keyMap) {
      handleSelect(keyMap[e.key]);
    }
  }, [selected, handleSelect]);

  useEffect(() => {
    if (selected !== null) return;
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, selected]);

  useEffect(() => {
    if (quizRef.current) quizRef.current.focus();
  }, [state.currentIndex]);

  return (
    <div className="max-w-2xl mx-auto space-y-6" ref={quizRef} tabIndex={-1}>
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/careers')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-accent-500 transition-fast"
        >
          <ChevronLeft className="w-4 h-4" />
          Exit
        </button>
        <span className="flex items-center gap-1.5 text-xs text-gray-900 bg-gradient-to-r from-brand-300 to-accent-300 px-3 py-1.5 rounded-full shadow-sm">
          <Keyboard className="w-3 h-3" />
          Press 1-4 to answer
        </span>
      </div>

      <div className="space-y-3">
        <TimerBar
          key={state.currentIndex}
          duration={state.timerDuration}
          onTimeout={handleTimeout}
          isPaused={isPaused}
        />
        <ProgressBar current={state.currentIndex} total={state.questions.length} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentIndex}
          initial={{ opacity: 0, x: 60, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -60, scale: 0.97 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Card className="p-6 sm:p-8">
            <QuestionCard
              question={question}
              selected={selected}
              onSelect={handleSelect}
              index={state.currentIndex}
            />

            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <FeedbackOverlay
                    isCorrect={state.feedback?.isCorrect}
                    explanation={state.feedback?.explanation}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {selected !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <Button onClick={handleNext} size="lg" icon={<ArrowRight className="w-4 h-4" />} variant="gradient">
                  {state.currentIndex + 1 >= state.questions.length ? 'See Results' : 'Next Question'}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
