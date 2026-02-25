import { AlertCircle, MapPin } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ErrorMessageProps {
  message: string;
  className?: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, className, onRetry }: ErrorMessageProps) => {
  // Check for specific error messages and provide helpful hints
  const getHelpfulHint = (msg: string): string => {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes('location') || lowerMsg.includes('query')) {
      return 'Try searching for a major city like "London", "New York", or "Tokyo"';
    }
    if (lowerMsg.includes('api') || lowerMsg.includes('access_key')) {
      return 'There may be an issue with the API key or your subscription plan';
    }
    if (lowerMsg.includes('network') || lowerMsg.includes('timeout')) {
      return 'Please check your internet connection and try again';
    }
    if (lowerMsg.includes('https')) {
      return 'The free plan requires HTTP (not HTTPS). Please try again.';
    }
    return '';
  };

  const hint = getHelpfulHint(message);

  return (
    <div
      className={cn(
        'glass-card p-8 flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(244, 63, 94, 0.2)' }}>
        <AlertCircle className="w-8 h-8" style={{ color: '#f43f5e' }} />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-offwhite mb-2">Unable to Load Weather Data</h3>
        <p className="text-sm mb-2" style={{ color: 'var(--color-slate-muted)' }}>{message}</p>
        {hint && (
          <div className="flex items-center gap-2 justify-center mt-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.05)' }}>
            <MapPin className="w-4 h-4" style={{ color: '#fb923c' }} />
            <p className="text-sm text-offwhite">{hint}</p>
          </div>
        )}
      </div>
      {onRetry && (
        <button onClick={onRetry} className="glass-button-primary mt-2">
          Try Again
        </button>
      )}
    </div>
  );
};
