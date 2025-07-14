import { Loader2 } from 'lucide-react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingSpinner: React.FC<Props> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  return (
    <div className="flex items-center justify-center">
      <Loader2 
        className={`animate-spin text-portal-green ${sizeClasses[size]} ${className}`} 
      />
    </div>
  );
};

export default LoadingSpinner;