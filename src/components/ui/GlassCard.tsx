import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const GlassCard = ({
  children,
  className,
  padding = 'md',
  blur = 'xl',
  onClick,
}: GlassCardProps) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white/5 border border-white/10 rounded-2xl',
        'shadow-lg shadow-black/10',
        'transition-all duration-300',
        'hover:bg-white/[0.07] hover:border-white/15',
        paddingClasses[padding],
        blurClasses[blur],
        className
      )}
    >
      {children}
    </div>
  );
};
