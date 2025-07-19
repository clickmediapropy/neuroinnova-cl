import { useEffect, useState } from 'react';

interface AnimatedProgressProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

const AnimatedProgress = ({ value, max, className = "", showPercentage = false }: AnimatedProgressProps) => {
  const [progress, setProgress] = useState(0);
  const percentage = Math.round((value / max) * 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);

    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={className}>
      <div className="relative w-full h-4 bg-muted rounded-full overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 animate-gradient" />
        </div>
        
        {/* Progress bar */}
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skeleton-loading" />
        </div>
        
        {/* Pulse at the end */}
        {progress > 0 && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full animate-pulse-slow"
            style={{ left: `calc(${progress}% - 4px)` }}
          />
        )}
      </div>
      
      {showPercentage && (
        <div className="mt-2 text-sm font-medium text-muted-foreground text-center animate-fade-in">
          {progress}% completado
        </div>
      )}
    </div>
  );
};

export default AnimatedProgress;