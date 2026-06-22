import { Hash } from 'lucide-react';
import OptionButton from './OptionButton';

export default function QuestionCard({ question, selected, onSelect, index }) {
  const disabled = selected !== null;

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center mt-0.5">
          <Hash className="w-4 h-4" />
        </span>
        <h2 className="text-xl font-bold text-gray-900 leading-relaxed">
          {question.question}
        </h2>
      </div>
      <div className="space-y-3">
        {question.options.map((opt, idx) => (
          <OptionButton
            key={idx}
            index={idx}
            text={opt}
            selected={selected}
            correct={question.correct}
            disabled={disabled}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}
