import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const letters = ['A', 'B', 'C', 'D'];

const hoverBorderColors = ['#14b8a6', '#3b82f6', '#a855f7', '#ec4899'];

export default function OptionButton({ index, text, selected, correct, disabled, onSelect }) {
  let borderStyle = 'border-gray-200';
  let bgStyle = '';
  let textStyle = '';
  let circleStyle = 'bg-gray-100 text-gray-700';
  let icon = null;

  if (selected !== null) {
    if (index === correct) {
      borderStyle = 'border-emerald-500 bg-emerald-50';
      textStyle = 'text-emerald-800';
      circleStyle = 'bg-emerald-200 text-emerald-800';
      icon = <Check className="w-4 h-4" />;
    } else if (index === selected && index !== correct) {
      borderStyle = 'border-red-500 bg-red-50';
      textStyle = 'text-red-800';
      circleStyle = 'bg-red-200 text-red-800';
      icon = <X className="w-4 h-4" />;
    } else {
      borderStyle = 'border-gray-200';
      textStyle = 'text-gray-400';
      circleStyle = 'bg-gray-100 text-gray-400';
    }
  }

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.2 }}
      whileHover={disabled ? {} : { scale: 1.01, borderColor: hoverBorderColors[index] }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 text-left font-medium transition-all ${borderStyle} ${bgStyle} ${textStyle} ${!disabled ? `cursor-pointer hover:bg-gray-50 hover:shadow-sm` : 'cursor-default'}`}
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
    >
      <motion.span
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${circleStyle}`}
        whileHover={disabled ? {} : { scale: 1.15 }}
      >
        {icon || letters[index]}
      </motion.span>
      <span className={`flex-1 ${selected !== null && index !== correct && index !== selected ? 'opacity-60' : ''}`}>{text}</span>
    </motion.button>
  );
}
