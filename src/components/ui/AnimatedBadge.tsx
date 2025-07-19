import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AnimatedBadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
  pulse?: boolean;
  glow?: boolean;
  className?: string;
}

const AnimatedBadge = ({ 
  children, 
  variant = "default", 
  pulse = false,
  glow = false,
  className 
}: AnimatedBadgeProps) => {
  const variants = {
    default: "bg-primary/10 text-primary border-primary/20",
    success: "bg-success/10 text-success border-success/20",
    warning: "bg-warning/10 text-warning border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent border-primary/30 text-primary"
  };

  return (
    <div className="relative inline-flex">
      {/* Glow effect */}
      {glow && (
        <div className={cn(
          "absolute inset-0 rounded-full blur-md",
          variant === "default" && "bg-primary/30",
          variant === "success" && "bg-success/30",
          variant === "warning" && "bg-warning/30",
          variant === "destructive" && "bg-destructive/30",
          "animate-pulse-slow"
        )} />
      )}
      
      {/* Badge */}
      <span className={cn(
        "relative inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300",
        variants[variant],
        pulse && "animate-pulse-slow",
        "hover:scale-105",
        className
      )}>
        {/* Animated dot */}
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              variant === "default" && "bg-primary",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "destructive" && "bg-destructive"
            )} />
            <span className={cn(
              "relative inline-flex rounded-full h-2 w-2",
              variant === "default" && "bg-primary",
              variant === "success" && "bg-success",
              variant === "warning" && "bg-warning",
              variant === "destructive" && "bg-destructive"
            )} />
          </span>
        )}
        
        {children}
      </span>
    </div>
  );
};

export default AnimatedBadge;