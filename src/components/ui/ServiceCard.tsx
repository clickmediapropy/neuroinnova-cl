import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  badge?: string;
  benefits?: string[];
  url: string;
  buttonText?: string;
  size?: "default" | "large" | "small";
  className?: string;
}

const ServiceCard = ({
  title,
  description,
  icon,
  badge,
  benefits,
  url,
  buttonText = "Más Información",
  size = "default",
  className,
}: ServiceCardProps) => {
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <div 
      className={cn(
        "relative flex flex-col rounded-lg border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 overflow-hidden service-particles card-hover-effect",
        isLarge && "md:col-span-2",
        className
      )}
    >
      {badge && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <Button variant="badge" size="badge" className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 sm:py-1.5 h-auto whitespace-nowrap min-w-fit">
            {badge}
          </Button>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col p-4 sm:p-6",
        isLarge && "sm:p-6 md:p-8",
        isSmall && "p-4 sm:p-5"
      )}>
        <div className={cn(
          "mb-3 sm:mb-4 flex items-start",
          isLarge && "sm:mb-5",
          badge && "pr-20 sm:pr-32" // Reduced padding on mobile
        )}>
          <div className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-accent/20",
            isLarge ? "h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14" : "h-10 w-10 sm:h-12 sm:w-12" 
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "ml-3 sm:ml-4 font-semibold text-foreground leading-tight",
            isLarge ? "text-base sm:text-lg md:text-xl lg:text-2xl" : "text-base sm:text-lg",
            "break-words max-w-full" // Ensure title respects container width
          )}>
            {title}
          </h3>
        </div>
        
        <p className={cn(
          "text-muted-foreground",
          isLarge ? "text-sm sm:text-base" : "text-sm"
        )}>
          {description}
        </p>
        
        {benefits && benefits.length > 0 && (
          <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className={isLarge ? "text-xs sm:text-sm" : "text-xs"}>{benefit}</span>
              </li>
            ))}
          </ul>
        )}
        
        <div className="mt-auto pt-4">
          <Button 
            variant="ghost" 
            size={isSmall ? "sm" : "default"} 
            className="group mt-2 p-0"
            asChild
          >
            <Link to={url} className="flex items-center text-primary">
              {buttonText}
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;