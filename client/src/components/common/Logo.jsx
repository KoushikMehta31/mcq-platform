const sizes = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export default function Logo({ size = 'md', className = '' }) {
  const px = sizes[size] || sizes.md;

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      <rect x="4" y="8" width="18" height="26" rx="4" fill="url(#logoGrad)" opacity="0.85" />
      <rect x="8" y="13" width="10" height="3" rx="1.5" fill="white" opacity="0.7" />
      <rect x="8" y="19" width="10" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="8" y="24" width="7" height="2" rx="1" fill="white" opacity="0.5" />
      <rect x="22" y="12" width="18" height="22" rx="4" fill="url(#logoGrad)" opacity="0.6" />
      <rect x="26" y="17" width="10" height="3" rx="1.5" fill="white" opacity="0.5" />
      <rect x="26" y="23" width="10" height="2" rx="1" fill="white" opacity="0.35" />
      <circle cx="37" cy="11" r="7" fill="#22c55e" stroke="white" strokeWidth="2" />
      <path d="M34 11l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
