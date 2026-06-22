import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary: 'bg-brand-400 text-gray-900 hover:bg-brand-500 focus:ring-brand-500 shadow-sm hover:shadow-md',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  success: 'bg-emerald-400 text-gray-900 hover:bg-emerald-500 focus:ring-emerald-500',
  danger: 'bg-red-400 text-gray-900 hover:bg-red-500 focus:ring-red-500',
  outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50 focus:ring-brand-500',
  ghost: 'text-gray-600 hover:text-brand-600 hover:bg-gray-100 focus:ring-brand-500',
  gradient: 'bg-gradient-to-r from-brand-400 to-accent-400 text-gray-900 font-bold hover:from-brand-500 hover:to-accent-500 focus:ring-accent-500 shadow-sm hover:shadow-lg',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-5 py-2.5 text-base gap-2',
  lg: 'px-7 py-3 text-lg gap-2.5',
};

export default function Button({ children, variant = 'primary', size = 'md', fullWidth, disabled, loading, icon, className = '', ...props }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold rounded-lg transition-fast focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}
