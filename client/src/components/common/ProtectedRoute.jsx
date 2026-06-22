import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" className="min-h-screen" />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}
