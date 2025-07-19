import { Info } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface QuestionOption {
  label: string;
  value: string;
  points: number;
}

interface QuestionCardProps {
  question: string;
  description?: string;
  examples?: string[];
  options: QuestionOption[];
  value: string;
  onValueChange: (value: string) => void;
}

const QuestionCard = ({
  question,
  description,
  examples,
  options,
  value,
  onValueChange
}: QuestionCardProps) => {
  return (
    <div className="bg-card rounded-lg border shadow-sm p-6 mb-8 animate-fade-in-up hover-lift transition-all duration-300">
      <div className="space-y-4">
        {/* Pregunta principal */}
        <h2 className="text-xl font-semibold flex items-start gap-2">
          <span className="flex-1">{question}</span>
          {(description || examples) && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-5 w-5 text-muted-foreground mt-1 cursor-help flex-shrink-0" />
                </TooltipTrigger>
                <TooltipContent className="max-w-md p-4">
                  {description && (
                    <p className="font-medium mb-2">{description}</p>
                  )}
                  {examples && examples.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-1">Ejemplos:</p>
                      <ul className="text-sm space-y-1">
                        {examples.map((example, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="mr-2">•</span>
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </h2>

        {/* Descripción visible (opcional) */}
        {description && (
          <p className="text-muted-foreground text-sm italic">
            {description}
          </p>
        )}

        {/* Opciones de respuesta */}
        <RadioGroup
          value={value}
          onValueChange={onValueChange}
          className="space-y-3 mt-6"
        >
          {options.map((option) => (
            <div 
              key={option.value} 
              className="flex items-center space-x-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
            >
              <RadioGroupItem value={option.value} id={`option-${option.value}`} />
              <Label 
                htmlFor={`option-${option.value}`} 
                className="flex-grow cursor-pointer font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default QuestionCard;