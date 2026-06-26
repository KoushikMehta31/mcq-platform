import { Trophy, Star, TrendingUp } from 'lucide-react';
import Badge from '../common/Badge';

const gradeConfig = {
  excellent: { label: 'Excellent', icon: Trophy, color: 'emerald', desc: 'Outstanding performance!' },
  good: { label: 'Good', icon: Star, color: 'amber', desc: 'Well done, keep improving!' },
  keepPracticing: { label: 'Keep Practicing', icon: TrendingUp, color: 'red', desc: 'Review and try again!' },
};

export default function ScoreCard({ score, total, career, language, level }) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;
  let gradeKey;
  if (pct >= 80) gradeKey = 'excellent';
  else if (pct >= 60) gradeKey = 'good';
  else gradeKey = 'keepPracticing';

  const grade = gradeConfig[gradeKey];
  const GradeIcon = grade.icon;

  return (
    <div className="text-center space-y-5">
      <div>
        <Badge color={grade.color} icon={<GradeIcon className="w-4 h-4" />} className="text-base px-4 py-1.5">
          {grade.label}
        </Badge>
        <p className="text-xs text-gray-400 mt-1">{grade.desc}</p>
      </div>

      <div className="text-3xl font-bold text-gray-900 tabular-nums">
        {score} <span className="text-gray-400 text-2xl">/</span> {total}
      </div>

      <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
        <Badge color="indigo">{career}</Badge>
        {language && <Badge color="purple">{language}</Badge>}
        <Badge color={level === 'beginner' ? 'emerald' : level === 'intermediate' ? 'amber' : 'red'}>{level}</Badge>
      </div>
    </div>
  );
}
