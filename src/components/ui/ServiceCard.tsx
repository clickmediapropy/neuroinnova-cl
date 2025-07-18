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
        "relative flex flex-col rounded-lg border border-border/60 bg-card shadow-sm transition-all duration-300 hover:shadow-md hover:border-primary/30 overflow-hidden",
        isLarge && "md:col-span-2",
        className
      )}
    >
      {badge && (
        <div className="absolute top-4 right-4 z-10">
          <Button variant="badge" size="badge" className="text-xs px-3 py-1.5 h-auto whitespace-nowrap min-w-fit">
            {badge}
          </Button>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col p-6",
        isLarge && "md:p-8",
        isSmall && "p-5"
      )}>
        <div className={cn(
          "mb-4 flex items-start",
          isLarge && "mb-5",
          badge && "pr-32" // Significantly increased padding - from pr-24 to pr-32 (8rem/128px)
        )}>
          <div className={cn(
            "flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-accent/20",
            isLarge ? "h-14 w-14" : "h-12 w-12" 
          )}>
            {icon}
          </div>
          <h3 className={cn(
            "ml-4 font-semibold text-foreground leading-tight",
            isLarge ? "text-xl md:text-2xl" : "text-lg",
            "break-words max-w-full" // Ensure title respects container width
          )}>
            {title}
          </h3>
        </div>
        
        <p className={cn(
          "text-muted-foreground",
          isLarge ? "text-base" : "text-sm"
        )}>
          {description}
        </p>
        
        {benefits && benefits.length > 0 && (
          <ul className="mt-4 space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className={isLarge ? "text-sm" : "text-xs"}>{benefit}</span>
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