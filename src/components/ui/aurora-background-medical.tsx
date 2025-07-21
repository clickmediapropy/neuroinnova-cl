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
      case 'low': return 'opacity-20';
      case 'medium': return 'opacity-30';
      case 'high': return 'opacity-50';
      default: return 'opacity-30';
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
            [--medical-gradient:repeating-linear-gradient(100deg,var(--primary)_0%,var(--primary)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--primary)_16%)]
            [--neural-gradient:repeating-linear-gradient(100deg,var(--accent)_0%,var(--accent)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--accent)_16%)]
            [--aurora-medical:repeating-linear-gradient(100deg,var(--primary)_10%,var(--blue-400)_15%,var(--primary)_20%,var(--accent)_25%,var(--blue-500)_30%)]
            [background-image:var(--medical-gradient),var(--aurora-medical)]
            dark:[background-image:var(--neural-gradient),var(--aurora-medical)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[8px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--medical-gradient),var(--aurora-medical)] 
            after:dark:[background-image:var(--neural-gradient),var(--aurora-medical)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-overlay
            pointer-events-none
            absolute -inset-[10px] will-change-transform`,
            getIntensityOpacity(),
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_center,black_20%,var(--transparent)_80%)]`
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};