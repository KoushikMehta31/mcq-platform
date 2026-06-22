const colors = {
  beginner: 'bg-emerald-100 text-emerald-800 ring-emerald-300',
  intermediate: 'bg-amber-100 text-amber-800 ring-amber-300',
  advanced: 'bg-red-100 text-red-800 ring-red-300',
  default: 'bg-gray-100 text-gray-800 ring-gray-300',
  cyan: 'bg-cyan-100 text-cyan-800 ring-cyan-300',
  blue: 'bg-blue-100 text-blue-800 ring-blue-300',
  purple: 'bg-purple-100 text-purple-800 ring-purple-300',
  red: 'bg-red-100 text-red-800 ring-red-300',
  amber: 'bg-amber-100 text-amber-800 ring-amber-300',
  green: 'bg-green-100 text-green-800 ring-green-300',
  pink: 'bg-pink-100 text-pink-800 ring-pink-300',
  indigo: 'bg-indigo-100 text-indigo-800 ring-indigo-300',
};

export default function Badge({ children, color = 'default', icon, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ring-1 ${colors[color] || colors.default} ${className}`}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
