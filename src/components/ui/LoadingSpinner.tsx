import { Brain } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Rotating outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-spin" 
          style={{ animationDuration: '3s' }} 
        />
        
        {/* Pulsing inner ring */}
        <div className="absolute inset-2 rounded-full border-4 border-accent/30 animate-spin" 
          style={{ animationDuration: '2s', animationDirection: 'reverse' }} 
        />
        
        {/* Central brain icon */}
        <div className="relative w-16 h-16 flex items-center justify-center">
          <Brain className="h-8 w-8 text-primary animate-pulse-slow" />
        </div>
      </div>
      
      {/* Loading text with shimmer effect */}
      <div className="mt-4 space-y-2">
        <div className="h-2 w-32 bg-gradient-to-r from-muted to-muted-foreground/20 rounded skeleton-loading" />
        <div className="h-2 w-24 bg-gradient-to-r from-muted to-muted-foreground/20 rounded skeleton-loading mx-auto" 
          style={{ animationDelay: '0.2s' }} 
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;