import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuroraTextProps {
  children: ReactNode;
  variant?: 'default' | 'light' | 'subtle' | 'shadow';
  className?: string;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
}

export const AuroraText = ({ 
  children, 
  variant = 'default', 
  className = '',
  as: Component = 'p'
}: AuroraTextProps) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'light': return 'text-on-aurora-light';
      case 'subtle': return 'text-on-aurora-subtle';
      case 'shadow': return 'text-shadow-aurora';
      default: return 'text-on-aurora';
    }
  };

  return (
    <Component className={cn(getVariantClass(), className)}>
      {children}
    </Component>
  );
};