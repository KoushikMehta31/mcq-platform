import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { motion } from 'framer-motion';
import { Grid3X3, LogOut, LogIn, UserPlus, User } from 'lucide-react';
import Logo from '../common/Logo';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isCareersActive = location.pathname.startsWith('/careers') || location.pathname.startsWith('/quiz') || location.pathname.startsWith('/result');

  return (
    <motion.header
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`${isHome ? 'bg-transparent' : 'bg-white shadow-sm'} border-b border-gray-200/50 sticky top-0 z-50 backdrop-blur-sm`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 text-xl font-bold text-brand-600 hover:text-brand-700 transition-fast group">
            <motion.span
              whileHover={{ rotate: -10, scale: 1.1 }}
              className="group-hover:drop-shadow-lg transition-fast"
            >
              <Logo size="sm" />
            </motion.span>
            <span className="hidden sm:inline bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
              MCQ Platform
            </span>
          </Link>

          <nav className="flex items-center gap-3 sm:gap-4">
            {user ? (
              <>
                <Link
                  to="/careers"
                  className={`flex items-center gap-1.5 text-sm font-medium transition-fast relative ${
                    isCareersActive
                      ? 'text-brand-600'
                      : 'text-gray-600 hover:text-brand-600'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Quizzes</span>
                  {isCareersActive && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500"
                    />
                  )}
                </Link>
                <span className="flex items-center gap-1.5 text-sm text-gray-500 ml-2">
                  <User className="w-4 h-4 text-brand-400" />
                  <span className="hidden sm:inline">{user.name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-fast font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-brand-600 transition-fast text-sm font-medium"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1.5 bg-gradient-to-r from-brand-400 to-accent-400 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:from-brand-500 hover:to-accent-500 transition-fast shadow-sm"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
