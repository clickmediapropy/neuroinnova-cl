import React, { ReactNode } from "react";
import { AuroraBackgroundMedical } from "@/components/ui/aurora-background-medical";

interface AuroraLayoutProps {
  children: ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  showRadialGradient?: boolean;
  className?: string;
}

export const AuroraLayout = ({ 
  children, 
  intensity = 'low',
  showRadialGradient = true,
  className = "" 
}: AuroraLayoutProps) => {
  return (
    <AuroraBackgroundMedical
      intensity={intensity}
      showRadialGradient={showRadialGradient}
      className={`min-h-screen ${className}`}
    >
      {children}
    </AuroraBackgroundMedical>
  );
};