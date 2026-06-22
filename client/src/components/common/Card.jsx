import { motion } from 'framer-motion';

const accentBorders = {
  cyan: 'border-t-cyan-400',
  blue: 'border-t-blue-400',
  purple: 'border-t-purple-400',
  red: 'border-t-red-400',
  amber: 'border-t-amber-400',
  green: 'border-t-green-400',
  emerald: 'border-t-emerald-400',
  pink: 'border-t-pink-400',
  indigo: 'border-t-indigo-400',
};

export default function Card({ children, className = '', onClick, hover, accent }) {
  const Component = hover ? motion.div : 'div';
  const extraProps = hover ? {
    whileHover: { scale: 1.03, y: -4, boxShadow: '0 20px 40px -12px rgba(99, 102, 241, 0.15)' },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  } : {};

  return (
    <Component
      className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${hover ? 'cursor-pointer' : ''} ${accent ? `border-t-4 ${accentBorders[accent] || ''}` : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter') onClick(); } : undefined}
      {...extraProps}
    >
      {children}
    </Component>
  );
}
