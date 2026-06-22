import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext.jsx';
import { QuizProvider } from './context/QuizContext.jsx';
import ProtectedRoute from './components/common/ProtectedRoute';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CareerSelection from './pages/CareerSelection';
import SubCategorySelection from './pages/SubCategorySelection';
import LevelSelection from './pages/LevelSelection';
import Quiz from './pages/Quiz';
import Result from './pages/Result';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/careers" element={<ProtectedRoute><CareerSelection /></ProtectedRoute>} />
          <Route path="/subcategories" element={<ProtectedRoute><SubCategorySelection /></ProtectedRoute>} />
          <Route path="/levels" element={<ProtectedRoute><LevelSelection /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/result" element={<ProtectedRoute><Result /></ProtectedRoute>} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
