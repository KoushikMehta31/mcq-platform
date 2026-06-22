import { ListChecks } from 'lucide-react';

export default function ProgressBar({ current, total }) {
  const pct = total > 0 ? Math.round(((current) / total) * 100) : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="flex items-center gap-1.5 text-sm font-medium text-gray-700">
          <ListChecks className="w-4 h-4 text-brand-500" />
          Question {current + 1} of {total}
        </span>
        <span className="text-sm font-semibold text-brand-600 tabular-nums">{pct}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden relative">
        <div
          className="bg-gradient-to-r from-brand-500 via-accent-400 to-brand-600 h-2.5 rounded-full transition-all duration-500 ease-out relative"
          style={{ width: `${pct}%`, backgroundSize: '200% 100%' }}
        />
        <div
          className="absolute inset-0 h-2.5 rounded-full opacity-30"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            backgroundSize: '200% 100%',
            animation: pct > 0 && pct < 100 ? 'shimmer 2s ease-in-out infinite' : 'none',
          }}
        />
      </div>
    </div>
  );
}
