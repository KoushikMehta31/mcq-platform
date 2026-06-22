import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'w-4 h-4', md: 'w-7 h-7', lg: 'w-10 h-10' };
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <Loader2 className={`${sizes[size]} animate-spin text-brand-600`} />
    </div>
  );
}
