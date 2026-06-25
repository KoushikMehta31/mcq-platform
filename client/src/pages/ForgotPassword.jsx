import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../services/api';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/forgot-password', { email });
      toast.success(res.data.message);
      setSent(true);
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong. Please try again.';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[60vh] flex items-start justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white to-accent-50/40 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="max-w-md mx-auto mt-8 sm:mt-16 w-full relative z-10"
      >
        <Card className="p-8 border-brand-100/50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-6"
          >
            <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 text-brand-600 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6" />
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
            <p className="text-sm text-gray-500 mt-1">
              {sent
                ? 'Check your email for the reset link'
                : 'Enter your email and we will send you a reset link'}
            </p>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-50 text-red-700 p-3 rounded-lg text-sm mb-4 border border-red-200"
            >
              {error}
            </motion.div>
          )}

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="bg-green-50 text-green-700 p-4 rounded-lg text-sm mb-6 border border-green-200">
                If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
              </div>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-brand-600 font-semibold hover:text-brand-700 hover:underline transition-fast"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Sign In
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <Button type="submit" fullWidth disabled={loading} loading={loading} icon={<Send className="w-4 h-4" />} variant="gradient">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-6">
            <Link to="/login" className="inline-flex items-center gap-1.5 text-brand-600 font-semibold hover:text-brand-700 hover:underline transition-fast">
              <ArrowLeft className="w-4 h-4" />
              Back to Sign In
            </Link>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
