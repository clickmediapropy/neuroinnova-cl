"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundMedicalProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

export const AuroraBackgroundMedical = ({
  className,
  children,
  showRadialGradient = true,
  intensity = 'medium',
  ...props
}: AuroraBackgroundMedicalProps) => {
  const getIntensityOpacity = () => {
    switch (intensity) {
      case 'low': return 'opacity-10';
      case 'medium': return 'opacity-20';
      case 'high': return 'opacity-30';
      default: return 'opacity-15';
    }
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `
            [--white-gradient:repeating-linear-gradient(100deg,white_0%,white_7%,transparent_10%,transparent_12%,white_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,black_0%,black_7%,transparent_10%,transparent_12%,black_16%)]
            [--aurora:repeating-linear-gradient(100deg,rgb(59_130_246)_10%,rgb(147_51_234)_15%,rgb(29_78_216)_20%,rgb(168_85_247)_25%,rgb(37_99_235)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px] invert dark:invert-0
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:dark:[background-image:var(--dark-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
            pointer-events-none
            absolute -inset-[10px] will-change-transform`,
            getIntensityOpacity(),
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};