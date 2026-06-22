import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, AlertTriangle } from 'lucide-react';

export default function WeakAreas({ questions, answers }) {
  const [openIndex, setOpenIndex] = useState(null);
  const wrongAnswers = answers.filter((a) => !a.isCorrect);
  if (wrongAnswers.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.35 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <span className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
          <AlertTriangle className="w-4 h-4" />
        </span>
        <h3 className="text-lg font-bold text-gray-900">Weak Areas</h3>
        <span className="text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
          {wrongAnswers.length} to review
        </span>
      </div>

      <div className="space-y-2">
        {wrongAnswers.map((answer, i) => {
          const question = questions.find((q) => q.id === answer.questionId);
          if (!question) return null;
          const isOpen = openIndex === i;
          const selectedText = question.options[answer.selected] || 'Timed out';
          const correctText = question.options[answer.correct];

          return (
            <motion.div
              key={answer.questionId}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              className={`rounded-xl border border-red-200 overflow-hidden transition-shadow ${isOpen ? 'shadow-sm' : ''}`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center gap-3 p-4 text-left bg-red-50 hover:bg-red-100 transition-fast"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-200 text-red-700 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-gray-900 leading-snug line-clamp-2">
                  {question.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 text-gray-400"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.span>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-1 space-y-2 bg-red-50">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-red-600 w-16 flex-shrink-0 mt-0.5">You chose:</span>
                        <span className="text-sm text-red-700 bg-red-100 px-2 py-0.5 rounded">{selectedText}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-emerald-600 w-16 flex-shrink-0 mt-0.5">Correct:</span>
                        <span className="text-sm text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">{correctText}</span>
                      </div>
                      {answer.explanation && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{answer.explanation}</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
