import { useReducer } from 'react';
import { QuizContext } from './quizContext';

const initialState = {
  career: null,
  subcategory: null,
  level: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  score: 0,
  quizStatus: 'idle',
  feedback: null,
  timerDuration: 30,
};

function quizReducer(state, action) {
  switch (action.type) {
    case 'SET_CAREER':
      return { ...state, career: action.payload, subcategory: null, level: null, questions: [], currentIndex: 0, answers: [], score: 0, quizStatus: 'idle' };
    case 'SET_SUBCATEGORY':
      return { ...state, subcategory: action.payload };
    case 'SET_LEVEL':
      return { ...state, level: action.payload };
    case 'SET_QUESTIONS':
      return { ...state, questions: action.payload, currentIndex: 0, answers: [], score: 0, quizStatus: 'active' };
    case 'ANSWER_QUESTION': {
      const current = state.questions[state.currentIndex];
      const isCorrect = action.payload === current.correct;
      const feedback = { selected: action.payload, correct: current.correct, isCorrect, explanation: current.explanation };
      return { ...state, feedback };
    }
    case 'NEXT_QUESTION': {
      const wasCorrect = state.feedback?.isCorrect;
      const newIndex = state.currentIndex + 1;
      const isFinished = newIndex >= state.questions.length;
      return {
        ...state,
        score: wasCorrect ? state.score + 1 : state.score,
        answers: [...state.answers, { questionId: state.questions[state.currentIndex].id, ...state.feedback }],
        currentIndex: newIndex,
        feedback: null,
        quizStatus: isFinished ? 'finished' : 'active',
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}


